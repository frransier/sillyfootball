/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Matches from "../../components/molecules/matches"
import Match from "../../components/molecules/match"
import PlayersHeading from "../../components/molecules/playersHeading"
import Board from "../../components/molecules/board"
import Slot from "../../components/molecules/slot"
import Player from "../../components/molecules/player"
import ReactLoading from "react-loading"
import { graphql, navigate } from "gatsby"
import axios from "axios"
import { useUserState } from "../../state"

const NextFantasyPage = ({ data }) => {
  const [players, setPlayers] = useState(data.players.edges.slice(0, 30))
  const [slots, setSlots] = useState([null, null])
  const [filters, setFilters] = useState(null)
  const [loading, setLoading] = useState(false)
  const userState = useUserState()

  function filter(teams) {
    if (filters === null) {
      const filtered = data.players.edges.filter(
        x => x.node.team._id === teams[0] || x.node.team._id === teams[1]
      )
      setPlayers(filtered)
      setFilters(teams)
    } else if (filters[0] === teams[0]) {
      setPlayers(data.players.edges.slice(0, 30))
      setFilters(null)
    } else {
      const filtered = data.players.edges.filter(
        x => x.node.team._id === teams[0] || x.node.team._id === teams[1]
      )
      setPlayers(filtered)
      setFilters(teams)
    }
  }
  function slot(player) {
    if (player) {
      if (slots[0] === null) {
        setSlots([player])
      } else if (slots.find(x => x._id === player._id)) {
        const newSlots = slots.filter(x => x._id !== player._id)
        setSlots(newSlots)
      } else if (slots[0] !== null) {
        const newSlots = [...slots, player]
        setSlots(newSlots)
        if (newSlots.length === 3) {
          setPlayers(data.players.edges.slice(0, 30))
          setFilters(null)
        }
      } else return
    }
    return
  }
  function post() {
    setLoading(true)
    const squad = slots.map(player => ({
      _id: `${player._id}-${data.matchday._id}`,
      _playerRef: player._id,
      _matchRef: data.matches.edges.find(
        ({ node }) =>
          node.home._id === player.team._id || node.away._id === player.team._id
      ).node._id,
      name: player.name || player.fullName,
      goals: 0,
      assists: 0,
      rate: player.rate
    }))
    // console.log(squad)

    const user = {
      _id: userState._id
    }
    const matchday = {
      _id: data.matchday._id
    }
    const ticket = {
      user: user,
      squad: squad,
      matchday: matchday
    }

    axios
      .post("/.netlify/functions/play", ticket)
      .then(res => {
        res.data === "OK" ? navigate("/account/") : console.log("nay")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Play" />
      <Board>
        <Slot player={slots[0]} dispatch={() => slot(slots[0])} />
        <Slot player={slots[1]} dispatch={() => slot(slots[1])} />
        <Slot player={slots[2]} dispatch={() => slot(slots[2])} />
      </Board>
      <Matches>
        <div sx={{ display: "grid" }}>
          <Styled.p
            sx={{
              mx: 2,
              mb: 2,
              mt: 0,
              alignSelf: "end",
              justifySelf: "start",
              textTransform: "capitalize",
              fontWeight: "display",
              fontSize: 2
            }}
          >
            Rules ->
          </Styled.p>
          <Styled.p
            sx={{
              mx: 2,

              alignSelf: "end",
              justifySelf: "start",
              textTransform: "capitalize",
              fontWeight: "display"
            }}
          >
            Deadline {data.matchday.deadline}
          </Styled.p>
        </div>
        {data.matches.edges.map(({ node }, i) => (
          <Match
            key={i}
            match={node}
            selected={filters && filters.includes(node.home._id) ? true : false}
            disabled={slots.length === 3 ? true : false}
            dispatch={() => filter([node.home._id, node.away._id])}
          />
        ))}
      </Matches>
      <div
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {slots.length === 3 && (
          <button
            onClick={() => post()}
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "red",
              color: "white",
              border: "none",
              borderRadius: 0,
              boxShadow: "4px 2px 4px darkgrey",
              mx: 3,
              my: 2,
              py: 2,
              px: 4
            }}
          >
            {loading ? (
              <ReactLoading type="bars" color="white" height={35} width={35} />
            ) : (
              <Styled.h2 sx={{ m: 0, textShadow: "2px 2px 2px black" }}>
                PLAY
              </Styled.h2>
            )}
          </button>
        )}
      </div>
      <div sx={{ my: 2, display: slots.length < 3 ? "" : "none" }}>
        <PlayersHeading main="Pick 3 Players" sub1="Goals" sub2="Assists" />
        {players.map(({ node }, i) => {
          const selected =
            slots[0] !== null ? slots.find(x => x._id === node._id) : false
          return (
            <Player
              key={i}
              player={node}
              dispatch={() => slot(node)}
              selected={selected}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default NextFantasyPage

export const query = graphql`
  query PlayerQuery {
    players: allSanityPlayer(
      filter: { team: { current: { eq: true } } }
      sort: { fields: points, order: DESC }
    ) {
      edges {
        node {
          _id
          name
          fullName
          assists
          goals
          rate
          team {
            _id
            fullName
            name
            logo {
              asset {
                fixed(width: 30) {
                  ...GatsbySanityImageFixed
                }
              }
            }
          }
        }
      }
    }
    matches: allSanityMatch(
      filter: { matchday: { status: { eq: "current" } } }
      sort: { fields: start, order: ASC }
    ) {
      edges {
        node {
          _id
          start
          day: start(formatString: "dddd", locale: "en")
          away {
            _id
            name
            fullName
          }
          home {
            _id
            name
            fullName
          }
        }
      }
    }
    matchday: sanityMatchday(status: { eq: "current" }) {
      _id
      prize
      deadline(formatString: "ddd MMM Do")
      start: deadline
    }
  }
`
