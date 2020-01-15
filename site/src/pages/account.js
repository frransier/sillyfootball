/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, Link, navigate } from "gatsby"
import { useUserState, useUserDispatch, useGameDispatch } from "../state"
import { useEffect, useState } from "react"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { FiRefreshCw } from "react-icons/fi"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/account/entry"
import Heading from "../components/account/heading"
import Matchday from "../components/account/matchday"
import Button from "../components/button"
import Footer from "../components/footer"
import { Spinner } from "@theme-ui/components"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const AccountPage = ({ data }) => {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  const gameDispatch = useGameDispatch()
  const [matchdays, setMatchdays] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMatchday, setCurrentMatchday] = useState()
  const users = mapEdgesToNodes(data.users).sort((a, b) =>
    b.season[0].points > a.season[0].points ? 1 : -1
  )
  const scores = [...new Set(users.map(x => x.season[0].points))]

  useEffect(() => {
    if (userState._id) {
      const query = `*[_type == "matchday"]{ status, index, _id, gold, silver, bronze, entries[]{user, players[]->{"fullName": fullName,"name": name, "_id": _id, "scores": scores}, }}`

      setTimeout(() => {
        client.fetch(query).then(matchdays => {
          const results = matchdays
            .map(matchday => {
              const result = matchday.entries.find(
                entry => entry.user._ref === userState._id
              )
              const id = matchday._id
              const index = matchday.index
              const gold = matchday.gold
              const silver = matchday.silver
              const bronze = matchday.bronze
              const status = matchday.status

              if (result)
                return {
                  entry: result,
                  id: id,
                  index: index,
                  gold: gold,
                  silver: silver,
                  bronze: bronze,
                  status: status,
                }
              else return null
            })
            .filter(Boolean)

          setCurrentMatchday(results.find(x => x.status === "current"))
          setLoading(false)
          setMatchdays(results)
        })
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function Logout() {
    userDispatch({ type: "reset" })
    gameDispatch({ type: "reset" })
    navigate("/")
  }

  return (
    <Layout>
      <SEO title="Account" />
      {userState ? (
        <div sx={{ display: "grid" }}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              width: "100%",
            }}
          >
            <Styled.h1>Välkommen {userState.name}</Styled.h1>
            <div sx={{ mx: "auto" }} />
            <button
              sx={{
                appearance: "none",
                border: "solid 1px",
                borderColor: "primary",
                bg: "background",
                color: "text",
                borderRadius: 4,
                fontFamily: "body",
                p: 3,
              }}
              onClick={() => Logout()}
            >
              Logga ut
            </button>
          </div>
          <div sx={{ display: "flex", mx: "auto", width: "100%" }}>
            <div sx={{}}>
              <Link to="/livescore/" style={{ textDecoration: "none" }}>
                <Styled.h2
                  sx={{
                    borderBottom: "solid 1px",
                    borderBottomColor: "primary",
                    my: 1,
                  }}
                >
                  Livescore
                </Styled.h2>
              </Link>
            </div>
            <div sx={{ mx: 7, mb: 6 }}>
              <Link to="/leaderboard/" style={{ textDecoration: "none" }}>
                <Styled.h2
                  sx={{
                    borderBottom: "solid 1px",
                    borderBottomColor: "primary",
                    my: 1,
                  }}
                >
                  Leaderboard
                </Styled.h2>
              </Link>
            </div>
          </div>

          <div sx={{ height: 240, display: "grid" }}>
            {loading ? (
              <div sx={{ mx: "auto", my: 9 }}>
                <Spinner size={60} />
              </div>
            ) : currentMatchday ? (
              <Matchday
                matchday={currentMatchday.entry}
                id={currentMatchday.id}
                index={currentMatchday.index}
                gold={currentMatchday.gold}
                silver={currentMatchday.silver}
                bronze={currentMatchday.bronze}
                current={true}
              />
            ) : (
              <div sx={{ mx: "auto", my: 8 }}>
                <div sx={{ textAlign: "center" }}>
                  <button
                    sx={{
                      appearance: "none",
                      border: "none",
                      bg: "background",
                      color: "text",
                    }}
                    onClick={() => window && window.location.reload()}
                  >
                    <FiRefreshCw size={30} />
                  </button>
                </div>
                <br />
                <Button text="Spela" action="fantasy" />
              </div>
            )}
          </div>

          <div sx={{ mt: 8 }}>
            <Heading />
          </div>
          {users.map((node, i) => (
            <Entry key={i} entry={node} scores={scores} />
          ))}
          <Styled.h1 sx={{ mt: 8 }}>Tidigare omgångar</Styled.h1>
          {matchdays &&
            matchdays.length > 0 &&
            matchdays.map((matchday, i) => {
              if (matchday.status !== "current") {
                return (
                  <Matchday
                    matchday={matchday.entry}
                    id={matchday.id}
                    index={matchday.index}
                    gold={matchday.gold}
                    silver={matchday.silver}
                    bronze={matchday.bronze}
                    key={i}
                  />
                )
              } else {
                return (
                  <Styled.p key={i} sx={{ my: 2 }}>
                    Inga träffar
                  </Styled.p>
                )
              }
            })}
        </div>
      ) : (
        <div>
          Hmm. Nånting är fel. Prova att refresh:a sidan eller logga in igen. Om
          problemet kvarstår kontakta hello@sillyfootball.se{" "}
        </div>
      )}
      <Footer />
    </Layout>
  )
}

export default AccountPage

export const query = graphql`
  query AccountPageQuery {
    users: allSanityUser(
      filter: {
        season: { elemMatch: { index: { eq: 1 }, points: { ne: null } } }
      }
    ) {
      edges {
        node {
          name
          _id
          season {
            gold
            silver
            bronze
            points
          }
        }
      }
    }
  }
`
