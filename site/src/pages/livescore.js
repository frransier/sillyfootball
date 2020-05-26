/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect, Fragment } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LiveMatch from "../components/molecules/liveMatch"
import Score from "../components/molecules/score"
import Ticket from "../components/molecules/ticket"
import Heading from "../components/molecules/heading"
import dayjs from "dayjs"
import ReactLoading from "react-loading"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false,
})

const LivescorePage = () => {
  const [matches, setMatches] = useState(null)
  const [scores, setScores] = useState(null)
  const [tickets, setTickets] = useState(null)
  const [deadline, setDeadline] = useState(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const matchesQuery = `*[_type == 'match' &&
      matchday->status == "current"]
      {
        matchday->{title, deadline},
        home->{
          _id,
          name,
          fullName
        },
        away->{
          _id,
          name,
          fullName
        },
        homeGoals,
        awayGoals,
        elapsed,
        status,
        start,
        events[]{
          goal->{
            name,
            fullName,
            team->{
              _id
            },
          },
          assist->{
            name,
            fullName,
            team->{
              _id
            }
          },
          elapsed,
          team->{
            _id
          }
        },
      }| order(start asc)`
    const scoresQuery = `*[_type == 'score' &&
      matchday->status == "current"]
      {
        "name": player->name,
        "fullName": player->fullName,
        "team": player->team->fullName,
        goals,
        assists,
        "points": (goals + assists) * rate
      } | order(points desc)[0...4]`
    const ticketsQuery = `*[_type == 'ticket' &&
      matchday->status == "current"]
      {
        user->{
          name
        },
        scores[]->{
          _id,
          "name": player->name,
          "fullName": player->fullName,
          "teamFullName": player->team->fullName,
          "teamName": player->team->name,
          goals,
          assists,
          rate,
          "points": (goals + assists) * rate,
        },
        "score": ((scores[0]->.goals + scores[0]->.assists) * scores[0]->.rate) +
                 ((scores[1]->.goals + scores[1]->.assists) * scores[1]->.rate) +
                 ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate)
      } | order(score desc)[0...50]`
    client.fetch(matchesQuery).then(x => {
      const deadlineDay = dayjs(x[0].matchday.deadline).format(
        "ddd MMM D HH:mm"
      )
      setDeadline(deadlineDay)
      setLive(dayjs() > dayjs(x[0].matchday.deadline))
      setMatches(x)
    })
    client.fetch(scoresQuery).then(x => setScores(x))
    client.fetch(ticketsQuery).then(x =>
      setTimeout(() => {
        setTickets(x)
      }, 300)
    )
  }, [])

  return (
    <Layout>
      <SEO title="Livescore" />
      {!tickets && (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <ReactLoading type="bars" color="red" height={35} width={35} />
        </div>
      )}
      {tickets && scores && matches && (
        <Fragment>
          <div sx={{ my: 3 }}>
            <Heading main={matches[0].matchday.title} sub1={deadline} />
          </div>
          {matches.map((x, i) => (
            <LiveMatch key={i} match={x} />
          ))}
          <div sx={{ my: 4 }}>
            <Heading
              main="Highscore"
              sub1="Goals"
              sub2="Assists"
              sub3="Points"
            />
            {scores.map((x, i) => (
              <Score key={i} player={x} />
            ))}
          </div>
          <div sx={{ my: 4 }}>
            <Heading main="Leaderboard" sub3="Points" />
            {tickets.map((x, i) => (
              <Ticket
                key={i}
                ticket={x}
                winner={x.score === tickets[0].score}
                disabled={!live}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Layout>
  )
}

export default LivescorePage
