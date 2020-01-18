/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { useEffect, useState } from "react"
import { useFilterState, useGameState, useUserState } from "../state"
import { graphql, navigate } from "gatsby"
import { Spinner } from "@theme-ui/components"
import { motion } from "framer-motion"
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
import tooLate from "../images/tooLate.svg"
import fullDark from "../images/full-dark.svg"
import tooLateDark from "../images/tooLate-dark.svg"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
]
const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"]

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
  const date = new Date(props.data.matchday.start)
  const minutes = date.getMinutes() === 0 ? "00" : `${date.getMinutes()}`
  const hours = `${date.getHours()}`
  const day = `${date.getDate()}`
  const weekday = weekdays[date.getDay()]
  const month = months[date.getMonth()]
  const deadline = `${weekday} ${day} ${month} kl ${hours}:${minutes}`
  const now = Date.now()
  const start = Date.parse(props.data.matchday.start)
  const deadlineDay = now > start ? true : false
  // const deadlineDay = true

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
    const user = userState && {
      _id: userState._id,
      id: userState.id,
      name: userState.name,
    }
    const matchday = {
      id: props.data.matchday._id,
      index: props.data.matchday.index,
      date: deadline,
    }

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
      <SEO title="Fantasy" description="Prova på ett annorlunda fantasy-spel" />
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
        <div>
          <div
            sx={{
              display: "grid",
            }}
          >
            {gameState && gameState.length !== 5 ? null : deadlineDay ? (
              <img
                sx={{
                  width: 200,
                  height: 35,
                  mx: "auto",
                  my: 5,
                }}
                src={colorMode === "default" ? tooLate : tooLateDark}
                alt="Fantasy Football"
              />
            ) : (
              <div sx={{ textAlign: "center" }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.4,
                  }}
                >
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
                </motion.div>
              </div>
            )}
          </div>
          <Board />
          {gameState && gameState.length < 5 ? (
            <div sx={{ display: "grid", minHeight: 970 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.4,
                }}
              >
                <Matches matches={matches} />
                <Players players={players} logos={logos} />
              </motion.div>
            </div>
          ) : (
            <Play
              entries={entries && entries}
              register={register}
              deadline={deadlineDay}
            />
            // <button onClick={register}>hej</button>
          )}
          {filters &&
            filters.length === 0 &&
            gameState &&
            gameState.length < 5 && (
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
                    bg: "primary",
                    border: "solid 2px",
                    borderColor: "primary",
                    color: "background",
                    borderRadius: 4,
                    fontFamily: "heading",
                    fontWeight: "heading",
                    appearance: "none",
                    cursor: "pointer",

                    ":after": {
                      color: "background",
                      bg: "primary",
                    },
                    ":active, :after": {
                      color: "text",
                      bg: "background",

                      opacity: 1,
                      transition: `0s`,
                    },
                  }}
                  onClick={() => showMore(40)}
                >
                  Visa fler
                </button>
              </div>
            )}
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
      index
      start
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
