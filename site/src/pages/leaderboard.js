import React, { useReducer, useEffect, useState } from "react"
import { graphql } from "gatsby"

import { useGraphQL } from "@brightleaf/react-hooks"
import { FaStar, FaUser } from "react-icons/fa"
import { Button, Flex, Box, Heading } from "rebass"
import { Label, Input } from "@rebass/forms"

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
    "https://0jt5x7hu.api.sanity.io/v1/graphql/odd/default",
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
        <Box textAlign="center" verticalAlign="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 0.9 }}
            transition={{
              duration: 1,

              stiffness: 200,
            }}
          >
            {state && state.length > 0 && (
              <Box textAlign="center" mt={-1}>
                <Heading textAlign="left" fontSize={2} fontWeight="normal">
                  {state.length} deltagare
                </Heading>
                {state[0].score > 0 && (
                  <Box
                    color="#5F6871"
                    p={2}
                    bg="primary"
                    sx={{ borderRadius: 5 }}
                  >
                    <Heading fontWeight="normal">
                      <Box>
                        {state[0].score}p{" "}
                        {Math.round((0.7 * 1000) / getWinners())} kr
                      </Box>
                    </Heading>
                    <Heading fontWeight="normal">
                      <Box>
                        {state[1].score + 2 === state[0].score
                          ? state[0].score - 2
                          : state[0].score - 1}
                        p {Math.round((0.3 * 1000) / getRunnersUp())} kr
                      </Box>
                    </Heading>
                  </Box>
                )}
              </Box>
            )}

            <Box my={3}>
              <Flex alignItems="center" justifyContent="center" width={1}>
                <Label width={1 / 100} htmlFor="email" name="email"></Label>
                <Input
                  bg="white"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="din@email.nu"
                  onChange={event => setEmail(event.target.value.toLowerCase())}
                />
                <Button bg="white" width={1 / 4} mx={2} onClick={trackTeams}>
                  <Heading color="#5F6872" sx={{ fontWeight: 1 }} fontSize={1}>
                    Rätta
                  </Heading>
                </Button>
              </Flex>
            </Box>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            stiffness: 200,
          }}
        >
          {trackedTeams.length > 0 &&
            trackedTeams.map(p => (
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
                  <Table fixed={["15%", "45%", "20%", "20%"]}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Box sx={{ borderRadius: 5 }} p={1} bg="primary">
                            <FaUser size={25}></FaUser>
                          </Box>
                        </TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell align="center">Mål</TableCell>
                        <TableCell align="center">Assist</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {p.players.map(player => {
                        return (
                          <TableRow>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
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
                    <Heading
                      color="#5F6871"
                      fontSize={3}
                    >{`Du fick ${p.score}p`}</Heading>
                  </Box>
                </Box>
              </motion.div>
            ))}

          <Heading my={2} textAlign="center">
            Leaderboard
          </Heading>

          {state &&
            state.slice(0, 10).map(p => (
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
                  <Table fixed={["20%", "40%", "20%", "20%"]}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Box
                            p={1}
                            sx={{ borderRadius: 5 }}
                            fontWeight="bold"
                            bg="primary"
                            textAlign="center"
                          >
                            <Heading fontSize={3}>{`${p.score}p`}</Heading>
                          </Box>
                        </TableCell>
                        <TableCell>{p._id.substr(p._id.length - 5)}</TableCell>
                        <TableCell align="center">Mål</TableCell>
                        <TableCell align="center">Assist</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {p.players.map(player => {
                        return (
                          <TableRow key={player._id}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
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
                </Box>
              </motion.div>
            ))}
        </motion.div>
      </Box>
    </Layout>
  )
}

export default LeaderboardPage
