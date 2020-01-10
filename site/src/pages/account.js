/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState } from "../state"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/account/entry"
import Heading from "../components/account/heading"
import Matchday from "../components/account/matchday"
import { Label, Input } from "@theme-ui/components"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: true,
})

const AccountPage = ({ data }) => {
  const userState = useUserState()
  const { logout } = useAuth()
  const [matchdays, setMatchdays] = useState([])
  const scores = [
    ...new Set(data.users.edges.map(x => x.node.season[0].points)),
  ]

  useEffect(() => {
    if (userState._id) {
      const query = `*[_type == "matchday"]{ index,_id, gold, silver, bronze, entries[]{user, players[]->{"fullName": fullName,"name": name, "_id": _id, "scores": scores}, }}`
      client.fetch(query).then(matchdays => {
        const results = matchdays.map(matchday => {
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
        })
        setMatchdays(results)
      })
    }
  }, [])

  useEffect(() => {
    console.log(matchdays)
  }, [matchdays])

  return (
    <Layout>
      <SEO title="Account" />
      {userState ? (
        <div>
          <Styled.h1>Välkommen {userState.name}</Styled.h1>
          <button onClick={logout}>logout</button>
          <Link to="/fantasy/">Spela</Link>
          <Heading />
          {data.users.edges.map(({ node }, i) => (
            <Entry key={i} entry={node} scores={scores} />
          ))}
          <Styled.h1>Stats</Styled.h1>
          {matchdays &&
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
      sort: { fields: season___points, order: ASC }
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
