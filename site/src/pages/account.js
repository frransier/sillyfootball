/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, Link, navigate } from "gatsby"
// import { useAuth } from "react-use-auth"
import { useUserState, useUserDispatch } from "../state"
import { useEffect, useState } from "react"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/account/entry"
import Heading from "../components/account/heading"
import Matchday from "../components/account/matchday"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const AccountPage = ({ data }) => {
  const userState = useUserState()
  const userDispatch = useUserDispatch()
  const [matchdays, setMatchdays] = useState([])
  const users = mapEdgesToNodes(data.users).sort((a, b) =>
    b.season[0].points > a.season[0].points ? 1 : -1
  )
  const scores = [...new Set(users.map(x => x.season[0].points))]

  useEffect(() => {
    if (userState._id) {
      const query = `*[_type == "matchday"]{ index,_id, gold, silver, bronze, entries[]{user, players[]->{"fullName": fullName,"name": name, "_id": _id, "scores": scores}, }}`
      client.fetch(query).then(matchdays => {
        const results = matchdays
          .map(matchday => {
            console.log(matchday)

            const result = matchday.entries.find(
              entry => entry.user._ref === userState._id
            )
            const id = matchday._id
            const index = matchday.index
            const gold = matchday.gold
            const silver = matchday.silver
            const bronze = matchday.bronze

            if (result)
              return {
                entry: result,
                id: id,
                index: index,
                gold: gold,
                silver: silver,
                bronze: bronze,
              }
            else return null
          })
          .filter(Boolean)
        setMatchdays(results)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(matchdays)
  }, [matchdays])
  function Logout() {
    userDispatch({ type: "reset" })
    navigate("/")
  }

  return (
    <Layout>
      <SEO title="Account" />
      {userState ? (
        <div>
          <Styled.h1>Välkommen {userState.name}</Styled.h1>
          <button onClick={() => Logout()}>logout</button>
          <Link to="/fantasy/">Spela</Link>
          <Heading />
          {users.map((node, i) => (
            <Entry key={i} entry={node} scores={scores} />
          ))}
          <Styled.h1>Stats</Styled.h1>
          {matchdays &&
            matchdays.length > 0 &&
            matchdays.map((matchday, i) => (
              <Matchday
                matchday={matchday.entry}
                id={matchday.id}
                index={matchday.index}
                gold={matchday.gold}
                silver={matchday.silver}
                bronze={matchday.bronze}
                key={i}
              />
            ))}
        </div>
      ) : (
        <div>hey</div>
      )}
    </Layout>
  )
}

export default AccountPage

export const query = graphql`
  query AccountPageQuery {
    users: allSanityUser(
      filter: {
        season: { elemMatch: { index: { eq: 1 }, points: { ne: null } } }
      }
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
