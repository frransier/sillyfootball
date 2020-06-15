/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect, Fragment } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Matches from "../../components/molecules/matches"
import Match from "../../components/molecules/match"
import Heading from "../../components/molecules/heading"
import Frame from "../../components/atoms/frame"
import Slot from "../../components/molecules/slot"
import Player from "../../components/molecules/player"
import Rules from "../../components/molecules/rules"
import Loading from "../../components/molecules/loading"
import { graphql, navigate } from "gatsby"
import axios from "axios"
import { useGlobalState, useGlobalDispatch } from "../../state"
import Container from "../../components/atoms/container"
import Button from "../../components/atoms/button"
// import { login, register } from "../../utils/auth"

const FantasyPage = ({ data }) => {
  const [players, setPlayers] = useState(data.players.edges.slice(0, 30))
  const [slots, setSlots] = useState([null, null])
  const [filters, setFilters] = useState(null)
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "set-loading", payload: false })
    }, 400)
  }, [dispatch])

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
    dispatch({ type: "set-loading", payload: true })
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
      _id: state.user._id
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
      {state && state.loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Container>
            <div
              sx={{
                display: "grid",
                justifyItems: "start"
              }}
            >
              <Styled.h3
                sx={{
                  // textAlign: slots.length === 3 ? "right" : "left",
                  fontSize: 3,
                  bg: slots.length === 3 ? "primary" : null,
                  // color: slots.length === 3 ? "background" : "text",

                  mx: 3,

                  mb: 5,
                  mt: 0
                }}
              >
                Pick 3 Players
              </Styled.h3>
            </div>
            <Rules deadline={data.matchday.deadline} />
            <Frame
              columns="1fr 1fr 1fr"
              bg={slots.length < 3 ? "backgorund" : "secondary"}
              borderWidth={0}
            >
              <Slot
                player={slots[0]}
                dispatch={() => slot(slots[0])}
                index={1}
              />
              <Slot
                player={slots[1]}
                dispatch={() => slot(slots[1])}
                index={2}
              />
              <Slot
                player={slots[2]}
                dispatch={() => slot(slots[2])}
                index={3}
              />
            </Frame>
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
            </Matches>
            {slots.length !== 3 && (
              <Styled.p sx={{ textAlign: "left", mx: 4, mt: 3 }}>
                Select match to filter players
              </Styled.p>
            )}
          </Container>
          {slots.length === 3 && state.user && (
            <Container>
              <div sx={{ width: 105, justifySelf: "center" }}>
                <Button
                  dispatch={() => post()}
                  fontSize={[2, 3]}
                  color="primary"
                >
                  PLAY
                </Button>
              </div>
            </Container>
          )}
          {slots.length === 3 && !state.user && (
            <Container>
              <div sx={{ width: [180, 240], justifySelf: "center" }}>
                <Button
                  // dispatch={() => register()}
                  fontSize={[2, 3]}
                  bg="red"
                  color="background"
                >
                  REGISTER FREE
                </Button>
              </div>
              <Styled.h5 sx={{ textAlign: "center" }}>Or</Styled.h5>
              <div sx={{ width: 105, justifySelf: "center" }}>
                <Button
                  // dispatch={() => login()}
                  fontSize={[2, 3]}
                  color="background"
                >
                  LOGIN
                </Button>
              </div>

              <Styled.h5 sx={{ textAlign: "center" }}>To Continue</Styled.h5>
            </Container>
          )}
          <Container>
            <div sx={{ display: slots.length < 3 ? "" : "none" }}>
              <Heading
                main=""
                sub1="Goals"
                sub2="Assists"
                columns="72% 14% 14%"
                justify="center"
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
          </Container>
        </Fragment>
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
      deadline(formatString: "dddd MMM Do")
      start: deadline
    }
  }
`
