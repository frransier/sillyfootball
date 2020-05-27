/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React, { useState } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Matches from "../../components/molecules/matches"
import Match from "../../components/molecules/match"
import PlayersHeading from "../../components/molecules/playersHeading"
import Board from "../../components/molecules/board"
import Slot from "../../components/molecules/slot"
import Player from "../../components/molecules/player"
import Rules from "../../components/molecules/rules"
import Loading from "../../components/molecules/loading"
import { graphql, navigate } from "gatsby"
import { motion } from "framer-motion"
import axios from "axios"
import { useUserState, useLoadingState, useLoadingDispatch } from "../../state"
import Container from "../../components/atoms/container"
import Centered from "../../components/atoms/centered"
import AltButton from "../../components/atoms/altButton"
import { useEffect } from "react"

const FantasyPage = ({ data }) => {
  const [players, setPlayers] = useState(data.players.edges.slice(0, 30))
  const [slots, setSlots] = useState([null, null])
  const [filters, setFilters] = useState(null)
  const userState = useUserState()
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()

  useEffect(() => {
    setTimeout(() => {
      loadingDispatch({ type: "set", loading: false })
    }, 400)
  }, [loadingDispatch])

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
    loadingDispatch({ type: "set", loading: true })
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
      {loading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5
          }}
        >
          <Container>
            <Board>
              <Slot player={slots[0]} dispatch={() => slot(slots[0])} />
              <Slot player={slots[1]} dispatch={() => slot(slots[1])} />
              <Slot player={slots[2]} dispatch={() => slot(slots[2])} />
            </Board>
          </Container>
          <Container>
            <Matches>
              {data.matches.edges.map(({ node }, i) => (
                <Match
                  key={i}
                  match={node}
                  selected={
                    filters && filters.includes(node.home._id) ? true : false
                  }
                  disabled={slots.length === 3 ? true : false}
                  dispatch={() => filter([node.home._id, node.away._id])}
                />
              ))}
              <Rules deadline={data.matchday.deadline} />
            </Matches>
            {slots.length !== 3 && (
              <Styled.p sx={{ textAlign: "left" }}>
                Select A Match To Filter Players
              </Styled.p>
            )}
          </Container>
          <Container>
            <Centered>
              {slots.length === 3 && (
                <AltButton dispatch={() => post()}>PLAY</AltButton>
              )}
            </Centered>
          </Container>
          <div
            sx={{
              mt: 2,
              mx: 2
            }}
          >
            <div sx={{ display: slots.length < 3 ? "" : "none" }}>
              <PlayersHeading
                main="Pick 3 Players"
                sub1="Goals"
                sub2="Assists"
              />
              {players.map(({ node }, i) => {
                return (
                  <Player
                    key={i}
                    player={node}
                    dispatch={() => slot(node)}
                    selected={
                      slots[0] !== null
                        ? slots.find(x => x._id === node._id)
                        : false
                    }
                  />
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </Layout>
  )
}

export default FantasyPage

export const query = graphql`
  query CurrentQuery {
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
