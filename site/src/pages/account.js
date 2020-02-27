/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, navigate } from "gatsby"
import { useUserState, useUserDispatch, useGameDispatch } from "../state"
import { useEffect, useState } from "react"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { motion } from "framer-motion"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/account/entry"
import Heading from "../components/account/heading"
import Matchday from "../components/account/matchday"
import Button from "../components/button"
import Footer from "../components/footer"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: false,
})

const AccountPage = ({ data }) => {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  const gameDispatch = useGameDispatch()
  const [matchdays, setMatchdays] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMatchday, setCurrentMatchday] = useState()

  const users = mapEdgesToNodes(data.users).sort((a, b) =>
    b.season[b.season.findIndex(season => season.index === 3)].points >
    a.season[a.season.findIndex(season => season.index === 3)].points
      ? 1
      : -1
  )
  const scores = [
    ...new Set(
      users.map(x => {
        const season = x.season.findIndex(season => season.index === 3)
        return x.season[season].points
      })
    ),
  ]

  useEffect(() => {
    if (userState._id && loading) {
      const query = `*[_type == "matchday"]{ status, index, start, title, _id, gold, silver, bronze, entries[]{user, players[]->{"fullName": fullName,"name": name, "_id": _id, "scores": scores}, }}`

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
            const start = matchday.start
            const title = matchday.title

            if (result)
              return {
                entry: result,
                id: id,
                index: index,
                gold: gold,
                silver: silver,
                bronze: bronze,
                status: status,
                start: start,
                title: title,
              }
            else return null
          })
          .filter(Boolean)
          .sort((a, b) => (a.title < b.title ? 1 : -1))

        setCurrentMatchday(results.find(x => x.status === "current"))
        setLoading(false)
        setMatchdays(results)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userState])

  function Logout() {
    userDispatch({ type: "reset" })
    gameDispatch({ type: "reset" })
    navigate("/")
  }

  function refresh() {
    setLoading(true)
  }

  return (
    <Layout>
      <SEO title="Account" />
      {userState ? (
        <div sx={{ display: "grid", mx: 4 }}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              width: "100%",
            }}
          >
            <Styled.h1 sx={{ my: 2 }}>Välkommen {userState.name}</Styled.h1>

            <div sx={{ mx: "auto" }} />
            <button
              sx={{
                border: "none",
                appearance: "none",
                bg: "primary",
                color: "background",
                borderRadius: 2,
                fontFamily: "body",
                py: 3,
                px: 5,
              }}
              onClick={() => Logout()}
            >
              Logga ut
            </button>
          </div>

          <div sx={{ height: 220, display: "grid" }}>
            {!currentMatchday ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.2,
                }}
              >
                <div sx={{ mx: "auto", my: 10 }}>
                  <div sx={{ textAlign: "center" }}>
                    <Button text="Spela" action="fantasy" />
                  </div>
                </div>
              </motion.div>
            ) : loading ? (
              <div>
                <br></br>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Matchday
                  matchday={currentMatchday.entry}
                  id={currentMatchday.id}
                  index={currentMatchday.index}
                  gold={currentMatchday.gold}
                  silver={currentMatchday.silver}
                  bronze={currentMatchday.bronze}
                  current={true}
                  refresh={refresh}
                  status={currentMatchday.status}
                  start={currentMatchday.start}
                />
              </motion.div>
            )}
          </div>

          <div sx={{ mt: 8 }}>
            <Heading currentSeason={3} />
          </div>
          {users.map((node, i) => (
            <Entry key={i} entry={node} scores={scores} currentSeason={3} />
          ))}
          <div sx={{ minHeight: 93 }}>
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
                      title={matchday.title}
                    />
                  )
                }
                return null
              })}
          </div>
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
        season: { elemMatch: { index: { eq: 3 }, points: { ne: null } } }
      }
    ) {
      edges {
        node {
          name
          _id
          season {
            index
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
