import React, { useReducer, useEffect } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import { useGraphQL } from "@brightleaf/react-hooks"
import { mapEdgesToNodes } from "../helpers"
import { Flex, Box, Text, Card } from "rebass"
import { GiSoccerBall } from "react-icons/gi"
import Layout from "../components/layout"
import SEO from "../components/seo"
import userReducer from "../state/userReducer"
import { motion } from "framer-motion"

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
  const { data, loading, error } = useGraphQL(
    "https://0jt5x7hu.api.sanity.io/v1/graphql/even/default",
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
  const [state, dispatch] = useReducer(userReducer, null)
  useEffect(() => {
    if (data) {
      dispatch({ type: "sort", data: data.players })
    }
  }, [data])

  const images = mapEdgesToNodes(props.data.teamLogos)
  const getLogo = id => {
    const logo = images.find(x => x._id === id)
    const fixed = logo.logo.asset.fixed
    return fixed
  }

  const getHighscorers = () => {
    if (state.length > 0) {
      const topScorers = state.filter(x => x.score === state[0].score)
      console.log(topScorers.length)

      return topScorers.length
    }
  }

  if (loading) {
    return (
      <Layout>
        <SEO title="Leaderboard" />
      </Layout>
    )
  }
  if (error) {
    return <Box>Error getting graphql data</Box>
  }

  return (
    <Layout>
      <SEO title="Leaderboard" />
      <Card textAlign="left">
        {state && state.length > 0 && (
          <Flex>
            <Box>
              <Text fontWeight="bold">Omsättning: 1000 kr</Text>
              <Text fontWeight="bold">{state.length} deltagare</Text>
            </Box>
            <Box mx="auto"></Box>
            {state[0].score > 0 && (
              <Box>
                <Text fontWeight="bold">
                  Utdelning {state[0].score}p:{" "}
                  {Math.round((0.7 * 1000) / getHighscorers())} kr
                </Text>
                <Text fontWeight="bold">
                  Utdelning {state[0].score - 1}p:{" "}
                  {Math.round((0.3 * 1000) / getHighscorers())} kr
                </Text>
              </Box>
            )}
          </Flex>
        )}
      </Card>
      {state &&
        state.map(p => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              stiffness: 200,
            }}
          >
            <Card width="100%">
              <Text my={1} fontSize={1} fontWeight="bold">
                ID: {p._id.substring(16, 25)}
              </Text>
              <Flex>
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
                          alt={player.name}
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
                  {[...Array(p.score)].map((_, i) => (
                    <Box key={i} mx={1} color="primary">
                      <GiSoccerBall size={25}></GiSoccerBall>
                    </Box>
                  ))}
                  <Box mx="auto"></Box>
                  <Flex textAlign="right">
                    <Box mx={2} fontWeight="bold" fontSize={2}>
                      <Text>{`Poäng: ${p.score}`}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Card>
            </Card>
          </motion.div>
        ))}
    </Layout>
  )
}

export default LeaderboardPage
