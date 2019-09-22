import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { useGraphQL } from "@brightleaf/react-hooks"
import { mapEdgesToNodes } from "../helpers"
import { Flex, Box, Text, Card, Heading } from "rebass"
import { GiSoccerBall } from "react-icons/gi"
import Layout from "../components/layout"

export const query = graphql`
  query Logos {
    teamLogos: allSanityTeam(filter: { index: { ne: null } }) {
      edges {
        node {
          _id
          logo {
            asset {
              fixed(width: 35) {
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

  const getPoints = playerList => {
    const points = playerList.map(p => p.matchPoints)
    const total = points.reduce((a, b) => a + b, 0)

    return total
  }

  if (loading) {
    return (
      <Layout>
        <Box>Loading Data</Box>
      </Layout>
    )
  }
  if (error) {
    return <Box>Error getting graphql data</Box>
  }
  return (
    <Layout>
      <Card>
        <Heading>Leaderboard</Heading>
        <Text></Text>
      </Card>
      {data.players.map(p => (
        <Card key={p._id} width="100%">
          <Flex key={p._id}>
            {p.players.map(player => {
              return (
                <Card
                  sx={{
                    width: "20%",
                    mx: "auto",
                  }}
                  key={player._id}
                  fontSize="0"
                >
                  <Text textAlign="center" height="30px" mt={1}>
                    {player.name}
                  </Text>
                  <Box textAlign="center">
                    <Image
                      key={player._id}
                      fixed={getLogo(player.team._id)}
                    ></Image>
                  </Box>
                  <Box textAlign="center" mt={2}>
                    <Text>{player.matchGoals || 0} Mål</Text>
                    <Text>{player.matchAssists || 0} Ass</Text>
                  </Box>
                </Card>
              )
            })}
          </Flex>
          <Card fontSize={0} textAlign="right">
            <Flex>
              {[...Array(getPoints(p.players))].map((_, i) => (
                <Box key={i} mx={1} color="primary">
                  <GiSoccerBall size={25}></GiSoccerBall>
                </Box>
              ))}
              <Box mx="auto"></Box>
              <Box textAlign="right">
                <Text>{`id: ${p._id.substring(16, 25)}`}</Text>
                <Text>{`points: ${getPoints(p.players)}`}</Text>
              </Box>
            </Flex>
          </Card>
        </Card>
      ))}
    </Layout>
  )
}

export default LeaderboardPage
