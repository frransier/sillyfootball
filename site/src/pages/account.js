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
import {
  // useUserDispatch,
  useUserState,
  useLoadingState,
  useLoadingDispatch
} from "../state"
import { FaTrophy } from "react-icons/fa"
import Frame from "../components/atoms/frame"
import { Link } from "gatsby"
// import { useAuth } from "react-use-auth"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const AccountPage = props => {
  const [tickets, setTickets] = useState(null)
  const [init, setInit] = useState(false)
  // const userDispatch = useUserDispatch()
  const userState = useUserState()
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()
  // const { logout } = useAuth()

  useEffect(() => {
    // console.log(userState)
    // console.log(props.data)

    loadingDispatch({ type: "set", loading: true })
    if (tickets) {
      setInit(true)
      loadingDispatch({ type: "set", loading: false })
    }
  }, [tickets, loadingDispatch])

  useEffect(() => {
    if (loading && userState) {
      const test =
        userState.friends.length > 0 &&
        userState.friends
          .map(
            (x, i) =>
              `user->_id == "${x._ref}" ${
                userState.friends.length - 1 > i ? "||" : ""
              }`
          )
          .join(" ")
      const ticketsQuery = `*[_type == 'ticket' && (matchday->status == "current" || matchday->status == "previous") && user->auth0Id == '${userState.auth0Id}' || ${test}  ]
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
      client.fetch(ticketsQuery).then(ticket => {
        // console.log(ticket)

        if (ticket && ticket.length > 0) {
          setTickets(ticket)
          loadingDispatch({ type: "set", loading: false })
        } else {
          setTickets("play")
          loadingDispatch({ type: "set", loading: false })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingDispatch])

  // function Logout() {
  //   userDispatch({ type: "reset" })
  //   logout()
  // }

  return (
    <Layout>
      <SEO title="Account" />
      {loading && <Loading />}

      {init && (
        <Container>
          <Matchday
            matchday={tickets.filter(x => x.matchday.status === "current")}
            status="Next"
            deadline={props.data.current.deadline}
          />
        </Container>
      )}
      {init && tickets !== "play" && (
        <Container>
          <Matchday
            matchday={tickets.filter(x => x.matchday.status === "previous")}
            status="Previous"
            deadline={props.data.previous.deadline}
          />
        </Container>
      )}
      {init && tickets !== "play" && (
        <Container>
          <Styled.h3 sx={{ mx: 4, m: 0 }}>My Leaderboard</Styled.h3>

          <Heading
            main=""
            sub1={
              <Frame borderRadius={0}>
                <FaTrophy
                  sx={{ color: "primary", bg: "secondary" }}
                  size={15}
                />
              </Frame>
            }
            sub2="High"
            sub3="Average"
            columns={["54% 16% 16% 14%", "53% 16% 14% 17%"]}
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
              Manage Friends >
            </Styled.h5>
          </Link>
        </Container>
      )}
      {init && (
        <Container>
          <Styled.h3 sx={{ mx: 4, m: 0 }}>Top 20</Styled.h3>
          <Heading
            sub1={
              <Frame borderRadius={0}>
                <FaTrophy
                  sx={{ color: "primary", bg: "secondary" }}
                  size={15}
                />
              </Frame>
            }
            sub2="High"
            sub3="Average"
            columns={["54% 16% 16% 14%", "53% 16% 14% 17%"]}
            justify="center"
          />
          {props.data.top50.edges.map(({ node }, i) => (
            <User user={node} key={i} index={i + 1} />
          ))}
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
