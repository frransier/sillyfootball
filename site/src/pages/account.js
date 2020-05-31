/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
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
// import { useAuth } from "react-use-auth"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const AccountPage = props => {
  const [current, setCurrent] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [init, setInit] = useState(false)
  // const userDispatch = useUserDispatch()
  const userState = useUserState()
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()
  // const { logout } = useAuth()

  useEffect(() => {
    loadingDispatch({ type: "set", loading: true })
    if (current && previous) {
      setInit(true)
      loadingDispatch({ type: "set", loading: false })
    }
  }, [current, previous, loadingDispatch])

  useEffect(() => {
    if (loading) {
      const currentQuery = `*[_type == 'ticket' && user->auth0Id == '${userState.auth0Id}' && matchday->status == "current"][0]
        {
          _id,
          matchday->{index, start},
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
      client.fetch(currentQuery).then(ticket => {
        if (ticket && ticket._id) {
          const currentFriendsHelper =
            ticket.user.friends.length > 0 &&
            ticket.user.friends
              .map(
                (x, i) =>
                  `user->_id == "${x._id}" ${
                    ticket.user.friends.length - 1 > i ? "||" : ""
                  }`
              )
              .join(" ")

          const currentFriendsQuery = `*[_type == 'ticket' && ${currentFriendsHelper} && matchday->status == "current"]
              {
                user->{
                  name,
                  average,
                  high,
                  wins,
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
              } | order(score desc)[0...10]`
          client.fetch(currentFriendsQuery).then(frnds => {
            setCurrent([ticket, ...frnds])
            loadingDispatch({ type: "set", loading: false })
          })
        } else {
          setCurrent("play")
          loadingDispatch({ type: "set", loading: false })
        }
      })
      const previousQuery = `*[_type == 'ticket' && user->auth0Id == '${userState.auth0Id}' && matchday->status == "previous"][0]
        {
          _id,
          matchday->{index, start},
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
      client.fetch(previousQuery).then(ticket => {
        if (ticket && ticket._id) {
          const previousFriendsHelper =
            ticket.user.friends.length > 0 &&
            ticket.user.friends
              .map(
                (x, i) =>
                  `user->_id == "${x._id}" ${
                    ticket.user.friends.length - 1 > i ? "||" : ""
                  }`
              )
              .join(" ")

          const previousFriendsQuery = `*[_type == 'ticket' && ${previousFriendsHelper} && matchday->status == "previous"]
              {
                user->{
                  name,
                  average,
                  high,
                  wins,
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
              } | order(score desc)[0...10]`
          client.fetch(previousFriendsQuery).then(frnds => {
            setPrevious([ticket, ...frnds])
          })
        } else {
          setPrevious("no hits")
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
            matchday={current}
            status="Next"
            deadline={props.data.current.deadline}
          />
        </Container>
      )}
      {init && current !== "play" && previous !== "no hits" && (
        <Container>
          <Matchday
            matchday={previous}
            status="Previous"
            deadline={props.data.previous.deadline}
          />
        </Container>
      )}
      {init && current !== "play" && (
        <Container>
          <Styled.h1 sx={{}}>Personal Leaderboard</Styled.h1>
          <Heading
            sub1={<FaTrophy sx={{ mx: 2, color: "red" }} size={15} />}
            sub2="High"
            sub3="Average"
            columns="40% 21% 21% 18%"
            justify="center"
          />
          {current
            .sort((a, b) => (a.user.average < b.user.average ? 1 : -1))
            .map((x, i) => (
              <User user={x.user} key={i} />
            ))}
        </Container>
      )}
      {init && (
        <Container>
          <Styled.h1 sx={{}}>Top 20</Styled.h1>
          <Heading
            sub1={<FaTrophy sx={{ mx: 2, color: "red" }} size={15} />}
            sub2="High"
            sub3="Average"
            columns="40% 21% 21% 18%"
            justify="center"
          />
          {props.data.top50.edges.map(({ node }, i) => (
            <User user={node} key={i} />
          ))}
        </Container>
      )}
      {init && <Footer />}
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
