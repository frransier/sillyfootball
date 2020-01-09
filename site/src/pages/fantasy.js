/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Board from "../components/fantasy/board"
import Matches from "../components/fantasy/matches"
import Players from "../components/fantasy/players"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { useEffect, useState } from "react"
import { usePlayerState } from "../state"
import { graphql, Link } from "gatsby"
import Footer from "../components/footer"
import Nav from "../components/nav"

const FantasyPage = props => {
  const filters = usePlayerState()
  const [players, setPlayers] = useState([])
  const matches = props.data.matches.edges[0].node.matches
  const initialState = mapEdgesToNodes(props.data.players)
  const initSlice = initialState.slice(0, 25)
  const logos = mapEdgesToNodes(props.data.logos)

  useEffect(() => {
    setPlayers(initSlice)
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

  return (
    <Layout>
      <SEO title="Fantasy" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "50% 50%",
        }}
      >
        <div
          sx={{
            mx: "auto",
          }}
        >
          <Link to="/white-paper/" style={{ textDecoration: "none" }}>
            <Styled.h2
              sx={{
                textAlign: "center",
                borderBottom: "solid 1px",
                borderBottomColor: "primary",
              }}
            >
              Så funkar det
            </Styled.h2>
          </Link>
        </div>

        <div sx={{ mx: "auto" }}>
          <Link to="/leaderboard/" style={{ textDecoration: "none" }}>
            <Styled.h2
              sx={{
                textAlign: "center",
                borderBottom: "solid 1px",
                borderBottomColor: "primary",
              }}
            >
              Leaderboard
            </Styled.h2>
          </Link>
        </div>
      </div>
      <Board />
      <Matches matches={matches} />
      <Players players={players} logos={logos} />
      {filters && filters.length === 0 && (
        <Styled.h2
          sx={{
            textAlign: "center",
            width: ["17%", "10%"],
            mx: "auto",
            borderBottom: "solid 1px",
            borderBottomColor: "primary",
          }}
          onClick={() => showMore(40)}
        >
          Visa fler
        </Styled.h2>
      )}
      <Footer />
    </Layout>
  )
}

export default FantasyPage

export const query = graphql`
  query MatchesQuery {
    matches: allSanityMatchday {
      edges {
        node {
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
