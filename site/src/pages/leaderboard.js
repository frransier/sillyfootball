import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { useGraphQL } from "@brightleaf/react-hooks"
import { mapEdgesToNodes } from "../helpers"

export const query = graphql`
  query Logos {
    teamLogos: allSanityTeam(filter: { index: { ne: null } }) {
      edges {
        node {
          _id
          logo {
            asset {
              fixed(width: 70) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`

const LeaderboardPage = props => {
  const images = mapEdgesToNodes(props.data.teamLogos)
  const getLogo = id => {
    const logo = images.filter(x => x._id === id)
    const fixed = logo[0].logo.asset.fixed
    console.log(fixed)

    return fixed
  }

  const { data, loading, error } = useGraphQL(
    "https://0jt5x7hu.api.sanity.io/v1/graphql/dev/default",
    `query Leaderboard {
  players: allUsers {
    _id
    players {
      name
      _id
      matchGoals
      matchAssists
      matchPoints
      team {
          _id
      }
    }
  }
}`
  )
  if (loading) {
    return <div>Loading Data</div>
  }
  if (error) {
    return <div>Error getting graphql data</div>
  }
  return (
    <div>
      {data.players.map(p => (
        <div key={p._id}>
          <div>{p._id.substring(0, 8)}</div>
          {p.players.map(player => {
            return (
              <Image key={player._id} fixed={getLogo(player.team._id)}></Image>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default LeaderboardPage
