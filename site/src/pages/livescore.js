/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LiveMatch from "../components/molecules/liveMatch"
import Score from "../components/molecules/score"
import Ticket from "../components/molecules/ticket"
import Heading from "../components/molecules/heading"
import Loading from "../components/molecules/loading"
import { useLoadingState, useLoadingDispatch } from "../state"
import { Fragment } from "react"
import Container from "../components/atoms/container"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const LivescorePage = ({ data }) => {
  const [matches, setMatches] = useState(null)
  const [scores, setScores] = useState(null)
  const [tickets, setTickets] = useState(null)
  const [live] = useState(data.matchday.deadline)
  const [init, setInit] = useState(false)
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()

  useEffect(() => {
    loadingDispatch({ type: "set", loading: true })
    if (matches && scores && tickets) {
      setInit(true)
      loadingDispatch({ type: "set", loading: false })
    }
  }, [matches, scores, tickets, loadingDispatch])
  useEffect(() => {
    if (loading) {
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
          "teamName": player->team->name,
          "teamFullName": player->team->fullName,
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
                   ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate),
          "count": count(*[_type == 'ticket' && matchday->status == "current"])
        } | order(score desc)[0...50]`
      client.fetch(matchesQuery).then(x => {
        setMatches(x)
      })
      client.fetch(scoresQuery).then(x => setScores(x))
      client.fetch(ticketsQuery).then(x =>
        setTimeout(() => {
          setTickets(x)
        }, 300)
      )
    }
  }, [loading])

  return (
    <Layout>
      <SEO title="Livescore" />
      {loading && <Loading />}
      {init && (
        <Fragment>
          <Container>
            <Heading
              main={matches[0].matchday.title}
              sub1={data.matchday.deadline}
              columns="50% 50%"
            />

            <Container mt={4}>
              {matches.map((x, i) => (
                <LiveMatch key={i} match={x} />
              ))}
            </Container>
          </Container>
          <Container>
            <Heading
              main="Highscore"
              sub1="Goals"
              sub2="Assists"
              sub3="Points"
              columns={["56% 15% 15% 14%", "55% 14% 14% 17%"]}
              justify="center"
            />
            <Container mt={4}>
              {scores.map((x, i) => (
                <Score key={i} player={x} />
              ))}
            </Container>
          </Container>
          <Container>
            <Heading
              main="Leaderboard"
              sub1={`${tickets[0].count} participants`}
              sub3="Points"
              columns={["54% 32% 14%", "55% 28% 17%"]}
              justify="center"
            />
            <Container mt={4}>
              {tickets.map((x, i) => (
                <Ticket
                  key={i}
                  ticket={x}
                  winner={x.score === tickets[0].score}
                  disabled={!live}
                />
              ))}
            </Container>
          </Container>
        </Fragment>
      )}
    </Layout>
  )
}

export default LivescorePage

export const query = graphql`
  query LivescoreQuery {
    matchday: sanityMatchday(status: { eq: "current" }) {
      deadline(formatString: "dddd MMM Do")
      start: deadline
    }
  }
`
