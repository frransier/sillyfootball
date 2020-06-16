/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Matchday from "../components/molecules/matchday"
import Loading from "../components/molecules/loading"
import User from "../components/molecules/user"
import Heading from "../components/molecules/heading"
import Container from "../components/atoms/container"
import { useGlobalState } from "../state"
import { FaTrophy } from "react-icons/fa"
import Frame from "../components/atoms/frame"
import { Link } from "gatsby"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const AccountPage = props => {
  const [tickets, setTickets] = useState(false)
  const state = useGlobalState()

  useEffect(() => {
    if (tickets) setTickets(null)
    Account()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  async function Account() {
    const friends =
      state.user.friends.length > 0 &&
      state.user.friends
        .map(
          (x, i) =>
            `user->_id == "${x._ref}" ${
              state.user.friends.length - 1 > i ? "||" : ""
            }`
        )
        .join(" ")
    const ticketsQuery = `*[_type == 'ticket' && (matchday->status == "current" || matchday->status == "previous") && user->auth0Id == '${
      state.user.auth0Id
    }' ${friends ? `|| ${friends}` : ""}]
        {
          _id,
          matchday->{index, start, status},
          user->{
            name,
            average,
            high,
            wins,
            friends[]->
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
        }`
    const ticks = await client.fetch(ticketsQuery)
    setTickets(ticks)
  }
  return (
    <Layout>
      <SEO title="Account" />
      {!tickets && <Loading />}
      {tickets && (
        <Container>
          <Matchday
            matchday={tickets.filter(x => x.matchday.status === "current")}
            status="Upcoming"
            deadline={props.data.current.deadline}
          />
          <div sx={{ mt: 5 }}>
            <Matchday
              matchday={tickets.filter(x => x.matchday.status === "previous")}
              status="Previous"
              deadline={props.data.previous.deadline}
            />
          </div>
          <div sx={{ mt: 5 }}>
            <Heading
              main="My League"
              sub1={
                <Frame borderRadius={0}>
                  <FaTrophy
                    sx={{ color: "primary", bg: "secondary" }}
                    size={15}
                  />
                </Frame>
              }
              sub2="High"
              sub3="Avg"
              columns={["58.7% 13% 13% 13%", "53.8% 15% 15% 15%"]}
              justify="center"
            />
            {tickets
              .sort((a, b) => (a.user.average < b.user.average ? 1 : -1))
              .map((x, i) => (
                <User user={x.user} key={i} index={i + 1} />
              ))}
            <Link
              to="/fantasy/"
              sx={{ textDecoration: "none", textAlign: "right", mt: 3 }}
            >
              <Styled.h5 sx={{ m: 4, color: "red", fontWeight: "heading" }}>
                Add Friends >
              </Styled.h5>
            </Link>
          </div>
          <div sx={{ mt: 5 }}>
            <Heading
              main="Silly Football League"
              sub1={
                <Frame borderRadius={0}>
                  <FaTrophy
                    sx={{ color: "primary", bg: "secondary" }}
                    size={15}
                  />
                </Frame>
              }
              sub2="High"
              sub3="Avg"
              columns={["58.7% 13% 13% 13%", "53.8% 15% 15% 15%"]}
              justify="center"
            />
            {props.data.top50.edges.map(({ node }, i) => (
              <User user={node} key={i} index={i + 1} />
            ))}
          </div>
        </Container>
      )}
    </Layout>
  )
}

export default AccountPage

export const query = graphql`
  query AccountQuery {
    current: sanityMatchday(status: { eq: "current" }) {
      _id
      prize
      deadline(formatString: "dddd MMM Do")
      start: deadline
    }
    previous: sanityMatchday(status: { eq: "previous" }) {
      _id
      prize
      deadline(formatString: "dddd MMM Do")
      start: deadline
    }
    top50: allSanityUser(
      filter: { high: { gt: 0 } }
      limit: 50
      sort: { fields: average, order: DESC }
    ) {
      edges {
        node {
          name
          wins
          high
          average
        }
      }
    }
  }
`
