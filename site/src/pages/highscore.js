/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IoIosRefresh } from "react-icons/io"
import { FaAngleLeft } from "react-icons/fa"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Entry from "../components/highscore/entry"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const HighscorePage = () => {
  const [matchday, setMatchday] = useState({})
  const [entries, setEntries] = useState([])
  const [scores, setScores] = useState([])
  const [start, setStart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    client.fetch(sanityQuery).then(matchday => {
      setMatchday({
        _id: matchday[0]._id,
        index: matchday[0].index,
        start: matchday[0].start,
        title: matchday[0].title,
      })
      const entries = matchday[0].entries
        .map(x => ({
          user: { _id: x.user.id, name: x.user.name },
          players: x.players.map(y => ({
            name: y.name,
            fullName: y.fullName,
            score:
              y.scores &&
              y.scores.find(z => z.matchday._ref === matchday[0]._id),
          })),
          points: x.players
            .map(p => {
              const total =
                p.scores &&
                p.scores.find(q => q.matchday._ref === matchday[0]._id)

              if (p.scores && total && total.points) {
                return total.points
              } else {
                return 0
              }
            })
            .filter(Boolean)
            .reduce((a, b) => a + b, 0),
        }))
        .sort((a, b) => (b.points > a.points ? 1 : -1))
      const scores = [...new Set(entries.map(x => x.points))]
      const now = Date.now()
      const start = Date.parse(matchday[0].start)

      setStart(start > now ? false : true)
      setScores(scores)
      setEntries(entries)
      setLoading(false)
    })
  }, [refresh])

  function hack() {
    setLoading(true)
    setRefresh(!refresh)
  }

  return (
    <Layout>
      <SEO title="Highscore" description="Följ omgången live på Highscore" />
      {loading ? (
        <div>
          <br></br>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
          }}
        >
          <div
            sx={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              sx={{
                display: "flex",
                mt: 6,
                mb: 8,
              }}
            >
              <Link to="/highscore/last/" style={{ textDecoration: "none" }}>
                <div sx={{ color: "darkgrey", mt: 6, mx: 5 }}>
                  <FaAngleLeft size={35} />
                </div>
              </Link>
              <div sx={{ mx: "auto" }}>
                <button
                  sx={{
                    appearance: "none",
                    border: "none",
                    borderRadius: 2,
                    p: 4,
                    bg: "background",
                    color: "text",
                    outline: "none",

                    ":active, :after": {
                      color: "primary",
                      bg: "background",
                    },
                  }}
                  onClick={() => hack()}
                >
                  <IoIosRefresh size={40} />
                </button>
              </div>
              <div
                sx={{ color: "background", mt: 2, mx: 5, display: "hidden" }}
              >
                <FaAngleLeft size={35} />
              </div>
            </div>
          </div>
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: "10% 59% 10% 10% 10%",
              borderBottom: "solid 1px",
              borderBottomColor: "primary",
              // my: 4,
            }}
          >
            <Styled.h1
              sx={{
                textAlign: "left",
                gridColumn: "span 2",
                my: 1,
                mx: 3,
              }}
            >
              Omgång {matchday.index} av 3 | Säsong {matchday.title}
            </Styled.h1>
            <Styled.p
              sx={{
                textAlign: "right",
                my: 1,
                mx: [0, 4],
                gridColumn: "span 3",
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
          {entries.length > 0 && <Footer />}
        </motion.div>
      )}
    </Layout>
  )
}

export default HighscorePage

const sanityQuery = `*[_type == "matchday" && status == 'current']{_id, index, start, title, entries[]
    {..., 
    user->{"name": name, "id": _id},    
    players[]->{"fullName": fullName, "name": name, "scores": scores}}
  }`
