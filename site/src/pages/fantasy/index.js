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
import Centered from "../../components/atoms/centered"
import Button from "../../components/atoms/button"
import { useAuth0 } from "../../state/auth0"
import dayjs from "dayjs"
import usePortal from "react-cool-portal"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
//m

const FantasyPage = ({ data }) => {
  const [players, setPlayers] = useState(data.players.edges.slice(0, 50))
  const [slots, setSlots] = useState([null, null])
  const [filters, setFilters] = useState(null)
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()
  const { loginWithRedirect } = useAuth0()
  const { Portal, isShow, show, hide } = usePortal({ defaultShow: true })
  let live = dayjs() > dayjs(data.matchday.start)

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
      setPlayers(data.players.edges.slice(0, 50))
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
          setPlayers(data.players.edges.slice(0, 50))
          setFilters(null)
        }
      } else return
    }
    return
  }
  function post() {
    if (dayjs() > dayjs(data.matchday.start)) live = true
    else {
      dispatch({ type: "set-loading", payload: true })
      const squad = slots.map(player => ({
        _id: `${player._id}-${data.matchday._id}`,
        _playerRef: player._id,
        _matchRef: data.matches.edges.find(
          ({ node }) =>
            node.home._id === player.team._id ||
            node.away._id === player.team._id
        ).node._id,
        name: player.name || player.fullName,
        goals: 0,
        assists: 0,
        rate: player.rate
      }))
      // console.log(squad)

      const user = {
        _id: state.user._id,
        auth0Id: state.user.auth0Id
      }
      const matchday = {
        _id: data.matchday._id,
        title: data.matchday.title
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
  }
  function Navigate() {
    dispatch({ type: "set-loading", payload: true })
    navigate("/fantasy/next/")
  }

  return (
    <Layout>
      <SEO title="Play" />
      {isShow && (
        <Portal>
          <div
            sx={{
              display: "grid",
              position: "fixed",
              top: ["12%", "12%"],
              left: ["3%", "25%"],
              width: ["94%", "50%"],
              height: [500, 500],
              p: 6,
              bg: "secondary",
              color: "background",
              borderRadius: 7,
              border: "solid 4px",
              borderColor: "secondary",
              boxShadow: "3px 3px 4px darkgrey"
            }}
            tabIndex={-1}
          >
            <div>
              <Styled.h2 sx={{ my: 0 }}>Rules</Styled.h2>
            </div>
            <div sx={{ mt: 4 }}>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>
                Points are only awarded when players score goals or make
                assists.
              </Styled.p>
            </div>
            <div sx={{ mt: 4 }}>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>
                The stars next to players indicate how many points they generate
                per goal or assist.
              </Styled.p>
            </div>
            <div sx={{ display: "flex", alignItems: "center", mt: 5 }}>
              <div
                sx={{ display: "flex", width: 55, justifyContent: "center" }}
              >
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
              </div>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>
                1 point per goal or assist
              </Styled.p>
            </div>
            <div sx={{ display: "flex", alignItems: "center" }}>
              <div
                sx={{ display: "flex", width: 55, justifyContent: "center" }}
              >
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
                <FaStarHalfAlt sx={{ mr: 3, color: "red" }} size={14} />
              </div>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>1.5 points</Styled.p>
            </div>
            <div sx={{ display: "flex", alignItems: "center" }}>
              <div
                sx={{ display: "flex", width: 55, justifyContent: "center" }}
              >
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
              </div>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>2 points</Styled.p>
            </div>
            <div sx={{ display: "flex", alignItems: "center" }}>
              <div
                sx={{ display: "flex", width: 55, justifyContent: "center" }}
              >
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
                <FaStar sx={{ mr: 3, color: "red" }} size={14} />
              </div>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>3 points</Styled.p>
            </div>
            <div sx={{ mt: 4 }}>
              <Styled.p sx={{ fontSize: 2 }}>
                Based on: goals + assists / 90min played
              </Styled.p>
            </div>
            <div sx={{ mt: 5 }}>
              <Styled.p sx={{ fontSize: 2, my: 0 }}>
                Players who are unlikely to score generate more points than
                players who are likely to score.
              </Styled.p>
            </div>
            <div>
              <Styled.p sx={{ fontSize: 2 }}>
                <br />
                Decide how to combine your team to maximise your final score.
                <br />
                <br /> Get the highest score to win.
              </Styled.p>
            </div>
            <div
              sx={{ width: 80, alignSelf: "end", justifySelf: "center", mt: 5 }}
            >
              <Button
                noShadow
                bg="primary"
                color="text"
                fontSize={[2, 2]}
                dispatch={hide}
              >
                X
              </Button>
            </div>
          </div>
        </Portal>
      )}
      {state && state.loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Container>
            <Rules deadline={data.matchday.deadline} dispatch={show} />
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
          <Centered>
            <Styled.h2
              sx={{
                textAlign: "center",
                fontSize: 4,
                bg: slots.length === 3 ? "primary" : null
                // color: slots.length === 3 ? "background" : "text",

                // mb: 5,
                // mt: 0
              }}
            >
              Pick 3 Players
            </Styled.h2>
          </Centered>

          <Container mt={5}>
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
                  color="background"
                  bg="secondary"
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
                  dispatch={() =>
                    loginWithRedirect({
                      prompt: "login",
                      screen_hint: "signup"
                    })
                  }
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
                  dispatch={() => loginWithRedirect({})}
                  fontSize={[2, 3]}
                  color="background"
                >
                  LOGIN
                </Button>
              </div>

              <Styled.h5 sx={{ textAlign: "center" }}>To Continue</Styled.h5>
            </Container>
          )}
          {live ? (
            <Container mt={0}>
              <div sx={{ width: [180, 240], justifySelf: "center" }}>
                <Styled.h3 sx={{ textAlign: "center", mt: 0 }}>
                  Deadline has passed
                </Styled.h3>
                <Button
                  dispatch={() => navigate("/livescore/")}
                  fontSize={[2, 3]}
                  bg="red"
                  color="background"
                >
                  Livescore
                </Button>
              </div>

              <div sx={{ width: 150, justifySelf: "center", my: 5 }}>
                <Button
                  dispatch={() => Navigate()}
                  fontSize={[2, 3]}
                  color="background"
                >
                  Next Round
                </Button>
              </div>
            </Container>
          ) : (
            // <Container>
            <div
              sx={{
                display: slots.length < 3 ? "" : "none",
                mt: 5
              }}
            >
              <Heading
                main=""
                sub1="Goals"
                sub2="Assists"
                columns={["72% 14% 14%", "69% 14% 14%"]}
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
            // </Container>
          )}
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
      sort: { fields: [rate, points], order: [ASC, DESC] }
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
      title
      deadline(formatString: "dddd MMMM Do")
      start: deadline
    }
  }
`
