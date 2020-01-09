/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Entry from "../components/account/entry"
import { graphql } from "gatsby"
import Heading from "../components/account/heading"

const AccountPage = ({ data }) => {
  const scores = [
    ...new Set(data.users.edges.map(x => x.node.season[0].points)),
  ]

  return (
    <Layout>
      <SEO title="Account" />
      <Heading />
      {data.users.edges.map(({ node }, i) => (
        <Entry key={i} entry={node} scores={scores} />
      ))}
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
