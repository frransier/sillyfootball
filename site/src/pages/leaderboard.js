import React, { useReducer, useEffect, useState } from "react"
import { graphql } from "gatsby"

import { useGraphQL } from "@brightleaf/react-hooks"
import { FaStar } from "react-icons/fa"
import { Button, Flex, Box, Text, Card, Heading } from "rebass"
import { Label, Input } from "@rebass/forms"
import { GiSoccerBall } from "react-icons/gi"
import Layout from "../components/layout"
import SEO from "../components/seo"
import userReducer from "../state/userReducer"
import { motion } from "framer-motion"
import { Table, TableHead, TableRow, TableCell, TableBody } from "sancho"

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
  const [email, setEmail] = useState()
  const [trackedTeams, setTrackedTeams] = useState([])
  const { data, loading, error } = useGraphQL(
    "https://0jt5x7hu.api.sanity.io/v1/graphql/even/default",
    `query Leaderboard {
      players: allUsers {
        _id
        email
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

  //const images = mapEdgesToNodes(props.data.teamLogos)

  // const getLogo = id => {
  //   const logo = images.find(x => x._id === id)
  //   const fixed = logo.logo.asset.fixed
  //   return fixed
  // }

  const getWinners = () => {
    if (state.length > 0) {
      const winners = state.filter(x => x.score === state[0].score)
      return winners.length
    }
  }
  const getRunnersUp = () => {
    if (state.length > 0) {
      const runnersUp = state.filter(x => x.score === state[0].score - 1)
      const backup = state.filter(x => x.score === state[1].score)
      console.log(state)

      if (runnersUp > 0) {
        return runnersUp.length
      }
      return backup.length
    }
  }

  const trackTeams = () => {
    const filter = state.filter(x => x.email === email)
    setTrackedTeams(filter)
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
      <Box mx="auto" width={[1, 4 / 5, 3 / 5]}>
        <Box>
          {state && state.length > 0 && (
            <Flex my={3}>
              <Box>
                <Text fontWeight="bold">Omsättning: 1000 kr</Text>
                <Text fontWeight="bold">{state.length} deltagare</Text>
              </Box>
              <Box mx="auto"></Box>
              {state[0].score > 0 && (
                <Box>
                  <Text fontWeight="bold">
                    Utdelning {state[0].score}p:{" "}
                    {Math.round((0.7 * 1000) / getWinners())} kr
                  </Text>
                  <Text fontWeight="bold">
                    Utdelning{" "}
                    {state[1].score + 2 === state[0].score
                      ? state[0].score - 2
                      : state[0].score - 1}
                    p: {Math.round((0.3 * 1000) / getRunnersUp())} kr
                  </Text>
                </Box>
              )}
            </Flex>
          )}
        </Box>
        <Box my={3}>
          <Flex alignItems="center" justifyContent="center" width={1}>
            <Label mx={1} width={1 / 3} htmlFor="email">
              Rättning
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="glenn@gbg.nu"
              onChange={event => setEmail(event.target.value.toLowerCase())}
            />
            <Button color="white" ml={2} onClick={trackTeams}>
              >
            </Button>
          </Flex>
        </Box>
        {trackedTeams.length > 0 &&
          trackedTeams.map(p => (
            <Card key={p._id} width="100%">
              <Text my={1} fontSize={1} fontWeight="bold">
                Ditt lag: {p.email}
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
                      {/* <Box textAlign="center">
                      <Image
                        key={player._id}
                        fixed={getLogo(player.team._id)}
                        alt={player.name}
                      ></Image>
                    </Box> */}
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
          ))}

        <Heading textAlign="center">Leaderboard</Heading>

        {state &&
          state.slice(0, 10).map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                stiffness: 200,
              }}
            >
              <Box
                width="100%"
                sx={{ borderStyle: "solid", borderWidth: "0px 0px 2px 0px" }}
              >
                <Table fixed={["13%", "47%", "20%", "20%"]}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Heading>{index + 1}.</Heading>
                      </TableCell>
                      <TableCell>Player</TableCell>
                      <TableCell align="center">Goals</TableCell>
                      <TableCell align="center">Assists</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {p.players.map(player => {
                      return (
                        <TableRow>
                          <TableCell component="th" scope="row" align="center">
                            {player.matchPoints && <FaStar></FaStar>}
                          </TableCell>
                          <TableCell align="left">{player.name}</TableCell>
                          <TableCell align="center">
                            {player.matchGoals}
                          </TableCell>
                          <TableCell align="center">
                            {player.matchAssists}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>

                <Box
                  p={1}
                  sx={{ borderRadius: 5 }}
                  fontWeight="bold"
                  bg="primary"
                  textAlign="center"
                >
                  <Heading fontSize={3}>{`${p.score}p`}</Heading>
                </Box>

                {/* <Text textAlign="right" my={1} fontSize={0}>
                          Team id: {p._id.substring(16, 25)}
                        </Text> */}
              </Box>
            </motion.div>
          ))}
      </Box>
    </Layout>
  )
}

export default LeaderboardPage
