/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { useEffect, useState } from "react"
import { useFilterState, useGameState, useUserState } from "../state"
import { graphql, Link, navigate } from "gatsby"
import { Spinner } from "@theme-ui/components"
import axios from "axios"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Board from "../components/fantasy/board"
import Matches from "../components/fantasy/matches"
import Players from "../components/fantasy/players"
import Footer from "../components/footer"
import Nav from "../components/nav"
import Play from "../components/fantasy/play"
import full from "../images/full.svg"
import fullDark from "../images/full-dark.svg"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const FantasyPage = props => {
  const gameState = useGameState()
  const userState = useUserState()
  const filters = useFilterState()
  const [colorMode] = useColorMode()
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState([])
  const [entries, setEntries] = useState([])
  const matches = props.data.matchday.matches
  const initialState = mapEdgesToNodes(props.data.players)
  const initSlice = initialState.slice(0, 25)
  const logos = mapEdgesToNodes(props.data.logos)

  useEffect(() => {
    setPlayers(initSlice)
    const sanityQuery = `*[_type == 'matchday' && status == 'current']{entries[]{user->{"name": name}}}`
    client.fetch(sanityQuery).then(x => {
      const userList = x[0].entries.map(x => x.user.name)
      setEntries(userList)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (filters.length > 0) {
      setPlayers(
        initialState.filter(
          x => x.team._id === filters[0] || x.team._id === filters[1]
        )
      )
    } else setPlayers(initSlice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  function showMore(increment) {
    const length = players.length + increment
    const slicer = initialState.slice(0, length)
    setPlayers(slicer)
  }
  function register() {
    setLoading(true)
    const squad =
      gameState &&
      gameState.map(player => {
        const p = { id: player.id, name: player.name }
        return p
      })
    const user = userState && { id: userState._id, name: userState.name }
    const matchday = props.data.matchday._id

    axios
      .post("/.netlify/functions/register", {
        params: { squad, user, matchday },
      })
      .then(res => {
        res.data === "OK" ? navigate("/thanks/") : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Fantasy" />
      <Nav />
      {loading ? (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 8,
          }}
        >
          <Spinner size={60} />
        </div>
      ) : (
        <div
          sx={{
            display: "grid",
          }}
        >
          {gameState && gameState.length !== 5 ? null : (
            <img
              sx={{
                width: 200,
                height: 35,
                mx: "auto",
                my: 5,
              }}
              src={colorMode === "default" ? full : fullDark}
              alt="Fantasy Football"
            />
          )}
        </div>
      )}

      <Board />
      {gameState && gameState.length < 5 ? (
        <div sx={{ display: "grid" }}>
          <Matches matches={matches} />
          <Players players={players} logos={logos} />
        </div>
      ) : (
        <Play entries={entries && entries} register={register} />
        // <button onClick={register}>hej</button>
      )}
      {filters && filters.length === 0 && gameState && gameState.length < 5 && (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            sx={{
              fontSize: 5,
              width: 120,
              my: 7,
              px: 6,
              py: 4,
              bg: "background",
              border: "solid 2px",
              borderColor: "primary",
              color: "text",
              borderRadius: 4,
              fontFamily: "heading",
              fontWeight: "heading",
              appearance: "none",
              cursor: "pointer",
            }}
            onClick={() => showMore(40)}
          >
            Visa fler
          </button>
        </div>
      )}
      <Footer />
    </Layout>
  )
}

export default FantasyPage

export const query = graphql`
  query MatchesQuery {
    matchday: sanityMatchday(status: { eq: "current" }) {
      _id
      matches {
        start
        home {
          team {
            _id
            name
            fullName
          }
        }
        away {
          team {
            _id
            name
            fullName
          }
        }
      }
    }
    players: allSanityPlayer(
      filter: { team: { active: { eq: true } } }
      sort: { fields: points, order: DESC }
    ) {
      edges {
        node {
          _id
          name
          fullName
          goals
          assists
          team {
            _id
            name
            fullName
          }
        }
      }
    }
    logos: allSanityTeam(filter: { active: { eq: true } }) {
      edges {
        node {
          _id
          logo {
            asset {
              fluid(maxWidth: 50) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`
