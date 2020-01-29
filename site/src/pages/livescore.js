/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { IoIosRefresh } from "react-icons/io"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Match from "../components/livescore/match"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: false,
})

const weekdays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
]
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
const query = `*[_type == "matchday" && status == "current"]{..., matches[]
    {..., 
    away{team->{"fullName": fullName,"name": name, "id": _id}, goals}, 
    home{team->{"fullName": fullName,"name": name, "id": _id}, goals},
    events[]{...,
    player->{"fullName": fullName, "name": name,}, assist->{"fullName": fullName, "name": name,}}}
  }`

const LivescorePage = () => {
  const [matches, setMatches] = useState([])
  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    client.fetch(query).then(matches => {
      const start = new Date(matches[0].start)
      const end = new Date(matches[0].end)
      if (start.getDate() === end.getDate()) {
        setDates([
          [
            weekdays[start.getDay()],
            `${start.getDate()}`,
            months[start.getMonth()],
          ],
        ])
      } else {
        setDates([
          [
            weekdays[start.getDay()],
            `${start.getDate()}`,
            months[start.getMonth()],
          ],
          [weekdays[end.getDay()], `${end.getDate()}`, months[end.getMonth()]],
        ])
      }
      setMatches(matches[0].matches)
      setLoading(false)
    })
  }, [refresh])

  function hack() {
    setLoading(true)
    setRefresh(!refresh)
  }

  return (
    <Layout>
      <SEO
        title="Livescore"
        description="Följ Sillyfootball:s omgångar live."
      />
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
          {matches.length > 0 &&
            dates.map((d, i) => (
              <div key={i} sx={{ display: "grid", mt: -4 }}>
                {/* <div sx={{ mx: "auto" }}> */}
                <div
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i === 0 && (
                    <Link
                      to="/livescore/last/"
                      style={{ textDecoration: "none" }}
                    >
                      <div sx={{ color: "darkgrey", mt: 2 }}>
                        <FaAngleLeft size={25} />
                      </div>
                    </Link>
                  )}
                  <Styled.h2
                    sx={{
                      textAlign: "center",
                      mx: 6,
                    }}
                  >
                    {d[0]} {d[1]} {d[2]}
                  </Styled.h2>
                  {i === 0 && (
                    <Link
                      to="/livescore/next/"
                      style={{ textDecoration: "none" }}
                    >
                      <div sx={{ mt: 2, color: "darkgrey" }}>
                        <FaAngleRight size={25} />
                      </div>
                    </Link>
                  )}
                </div>
                {/* </div> */}
                {matches.map((x, xi) => {
                  const xdate = new Date(x.start)
                  const day = xdate.getDate().toString()
                  if (d[1] === day)
                    return <Match key={xi} index={xi} match={x} />
                  return null
                })}
              </div>
            ))}

          <div sx={{ textAlign: "center", my: 7 }}>
            <button
              sx={{
                appearance: "none",
                border: "none",
                bg: "background",
                color: "text",
                borderRadius: 2,
                p: 2,
                ":active, :after": {
                  color: "primary",
                  bg: "background",
                  opacity: 1,
                  transition: `0s`,
                },
              }}
              onClick={() => hack()}
            >
              <IoIosRefresh size={40} />
            </button>
          </div>
          {matches.length > 0 && <Footer />}
        </motion.div>
      )}
    </Layout>
  )
}

export default LivescorePage
