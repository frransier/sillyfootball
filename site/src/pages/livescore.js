/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Footer from "../components/footer"
import Match from "../components/livescore/match"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
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
const query = `*[_type == "matchday" && index == 1]{..., matches[]
    {..., 
    away{team->{"fullName": fullName,"name": name, "id": _id}, goals}, 
    home{team->{"fullName": fullName,"name": name, "id": _id}, goals},
    events[]{...,
    player->{"fullName": fullName, "name": name,}, assist->{"name": fullName}}}
  }`

const LivescorePage = () => {
  const [matches, setMatches] = useState([])
  const [updated, setUpdated] = useState([])
  const [dates, setDates] = useState([])
  useEffect(() => {
    const newMatches = updated.map((x, i) => {
      x.away.team = matches[i].away.team
      x.home.team = matches[i].home.team
      return x
    })
    setMatches(newMatches)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])
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
    })
    const subscription = client.listen(query).subscribe(updater => {
      setUpdated(updater.result.matches)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <Layout>
      <SEO title="Livescore" />
      <Nav />
      {matches.length > 0 &&
        dates.map((d, i) => (
          <div key={i} sx={{ display: "grid" }}>
            <div sx={{ mx: "auto" }}>
              <Styled.h1
                sx={{
                  borderBottom: "solid 2px",
                  borderBottomColor: "primary",
                  textAlign: "center",
                }}
              >
                {d[0]} {d[1]} {d[2]}
              </Styled.h1>
            </div>
            {matches.map((x, xi) => {
              const xdate = new Date(x.start)
              const day = xdate.getDate().toString()
              if (d[1] === day) return <Match key={xi} index={xi} match={x} />
              return null
            })}
          </div>
        ))}
      {matches.length > 0 && <Footer />}
    </Layout>
  )
}

export default LivescorePage
