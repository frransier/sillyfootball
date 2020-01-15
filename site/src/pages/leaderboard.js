/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Footer from "../components/footer"
import { graphql } from "gatsby"
import Entry from "../components/leaderboard/entry"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const LeaderboardPage = () => {
  const [matchday, setMatchday] = useState({})
  const [entries, setEntries] = useState([])
  const [scores, setScores] = useState([])
  const [start, setStart] = useState(false)
  useEffect(() => {
    client.fetch(sanityQuery).then(matchday => {
      setMatchday({
        _id: matchday[0]._id,
        index: matchday[0].index,
        start: matchday[0].start,
      })
      const entries = matchday[0].entries
        .map(x => ({
          user: { _id: x.user.id, name: x.user.name },
          players: x.players.map(y => ({
            name: y.name,
            score:
              y.scores &&
              y.scores.find(z => z.matchday._ref === matchday[0]._id),
          })),
          points: x.players
            .map(p => {
              if (
                p.scores &&
                p.scores.find(q => q.matchday._ref === matchday[0]._id) &&
                p.scores.points
              ) {
                return p.scores.points
              } else {
                return 0
              }
            })
            .reduce((a, b) => a + b, 0),
        }))
        .sort((a, b) => (b.points > a.points ? 1 : -1))
      const scores = [...new Set(entries.map(x => x.points))]
      const now = Date.now()
      const start = Date.parse(matchday[0].start)

      setStart(start > now ? false : true)
      setScores(scores)
      setEntries(entries)
    })
  }, [])

  return (
    <Layout>
      <SEO title="Livescore" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Styled.h1
          sx={{
            textAlign: "center",
            borderBottom: "solid 2px",
            borderBottomColor: "primary",
          }}
        >
          Omgång {matchday.index} av 3 | Säsong 1
        </Styled.h1>
      </div>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          borderBottom: "solid 1px",
          borderBottomColor: "primary",
        }}
      >
        <div></div>

        <Styled.p
          sx={{
            textAlign: "right",
            my: 1,
            gridColumn: "span 4",
            fontWeight: "heading",
          }}
        >
          Score
        </Styled.p>
      </div>
      {entries.length > 0 &&
        entries.map((x, i) => (
          <Entry key={i} x={x} scores={scores} start={start} />
        ))}
      {entries.length > 0 && <Footer></Footer>}
    </Layout>
  )
}

export default LeaderboardPage

const sanityQuery = `*[_type == "matchday" && status == 'current']{_id, index, start, entries[]
    {..., 
    user->{"name": name, "id": _id},    
    players[]->{"name": fullName, "scores": scores}}
  }`

export const query = graphql`
  query LeaderboardQuery {
    season: allSanityUser(
      filter: {
        season: { elemMatch: { index: { eq: 1 }, points: { ne: null } } }
      }
      sort: { fields: season___points, order: ASC }
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
