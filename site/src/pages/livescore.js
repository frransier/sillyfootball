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
import { useGlobalState } from "../state"
import { Fragment } from "react"
import Container from "../components/atoms/container"
import dayjs from "dayjs"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const LivescorePage = ({ data }) => {
  const [livescore, setLivescore] = useState(null)
  const live = dayjs() > dayjs(data.matchday.start)
  const state = useGlobalState()

  useEffect(() => {
    if (livescore) setLivescore(null)
    Livescore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  async function Livescore() {
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
              goal,
              assist,
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
            "points": (goals + assists) * rate,
            rate
          } | order(points desc)[0...4]`
    const ticketsQuery = `*[_type == 'ticket' &&
          matchday->status == "current"]
          {
            user->{
              _id,
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
    const match = await client.fetch(matchesQuery)
    const score = await client.fetch(scoresQuery)
    const ticket = await client.fetch(ticketsQuery)
    setLivescore({ matches: match, scores: score, tickets: ticket })
  }

  return (
    <Layout>
      <SEO title="Livescore" />
      {!livescore && <Loading />}
      {livescore && (
        <Fragment>
          <Container>
            <Heading
              main={livescore.matches[0].matchday.title}
              sub1={data.matchday.deadline}
              columns="50% 50%"
            />

            <Container mt={4}>
              {livescore.matches.map((x, i) => (
                <LiveMatch key={i} match={x} />
              ))}
            </Container>
          </Container>
          {live && (
            <Container>
              <Heading
                main="Highscore"
                sub1="Goals"
                sub2="Assists"
                sub3="Points"
                columns={["61% 13% 13% 13%", "55% 15% 15% 15%"]}
                // ["11% 33% 12% 33% 11%", "15% 28% 14% 28% 15%"],
                justify="center"
              />
              <Container mt={4}>
                {livescore.scores.map((x, i) => (
                  <Score key={i} player={x} />
                ))}
              </Container>
            </Container>
          )}
          <Container>
            <Heading
              main="Leaderboard"
              sub1={`${
                livescore.tickets[0] ? livescore.tickets[0].count : 0
              } participants`}
              sub3="Score"
              columns={["53% 32% 14%", "55% 28% 17%"]}
              justify="center"
            />
            <Container mt={4}>
              {livescore.tickets.map((x, i) => (
                <Ticket
                  key={i}
                  ticket={x}
                  winner={x.score === livescore.tickets[0].score}
                  disabled={live}
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
