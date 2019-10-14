import React, { useState } from "react"
import { navigate } from "@reach/router"
import axios from "axios"
import { Flex, Heading, Box, Image, Button, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PlayerList from "../components/playerList"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import Matches from "../components/matches"
import { useDispatchContext, useStateContext } from "../state"
import { useToast, Spinner } from "sancho"
import { FaRegTimesCircle, FaCheck } from "react-icons/fa"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import { IoMdArrowDroprightCircle } from "react-icons/io"

const searchClient = algoliasearch(
  "C1ICPA4UBZ",
  "cc596e105e36167542f65e83e4b04b1a"
)
const GamePage = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const toast = useToast()

  const register = () => {
    setLoading(true)
    const squad =
      state &&
      state.map(player => {
        const p = { id: player._id, name: player.name }
        return p
      })

    axios
      .post("/.netlify/functions/register", { params: { squad, email } })
      .then(res => {
        res.data === "OK" ? navigate("/thanks/") : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <Layout>
      <SEO title="Spela" />
      <InstantSearch searchClient={searchClient} indexName="players">
        <Box
          bg="primary"
          width={[1, 4 / 5, 3 / 5]}
          mx="auto"
          height={200}
          sx={{
            borderColor: "white",
            borderStyle: "solid",
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Box
            width={1 / 2}
            mx="auto"
            bg="primary"
            height={50}
            sx={{
              borderWidth: "6px",
              borderColor: "white",
              borderStyle: "solid",
              borderTop: "none",
            }}
          ></Box>
          {state && state.length < 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                stiffness: 200,
              }}
            >
              <Box textAlign="center" verticalAlign="center">
                <Heading
                  textAlign="center"
                  mt={2}
                  fontSize={(4, 5)}
                  sx={{ color: "white" }}
                  fontWeight="thin"
                >
                  Välj 5 spelare
                </Heading>
                <Box color="white">
                  <Text
                    textAlign="center"
                    sx={{
                      fontWeight: "thin",
                      fontSize: 2,
                      fontFamily: "body",
                    }}
                  >
                    1 poäng per mål eller assist
                  </Text>

                  <Text
                    mt={4}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                    sx={{ fontFamily: "body" }}
                  >
                    1000 kr free roll
                  </Text>
                  <Text
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                    sx={{ fontFamily: "body" }}
                  >
                    Lördag 19 oktober kl 13:00
                  </Text>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <Flex flexWrap="wrap" my={[-4, 3]}>
              {state &&
                state.map((player, index) => {
                  return (
                    <Box key={index} mx="auto" width={[1 / 3, 1 / 5]}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          stiffness: 200,
                        }}
                      >
                        <Box
                          onClick={() => (
                            toast({
                              title: `${player.name} togs bort från ditt lag`,
                              position: "top",
                              intent: "warning",
                              duration: 1000,

                              // eslint-disable-next-line
                            }),
                            dispatch({ type: "remove", index })
                          )}
                          sx={{ borderRadius: 12 }}
                          key={index}
                          textAlign="center"
                        >
                          <Box>
                            <Image
                              width="40px"
                              height="40px"
                              src={player.team.logo.asset.url}
                              alt={player.name}
                            ></Image>
                            <Text
                              color="white"
                              sx={{ fontFamily: "body" }}
                              fontWeight="thin"
                              fontSize={[1]}
                              mx="auto"
                            >
                              {player.name}
                            </Text>
                            <Box mt={1} color="white">
                              <FaRegTimesCircle></FaRegTimesCircle>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </Box>
                  )
                })}
            </Flex>
          )}
        </Box>

        {state && state.length < 5 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              stiffness: 200,
            }}
          >
            <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
              <Text
                my={2}
                sx={{ fontFamily: "heading" }}
                textAlign="center"
                fontSize={3}
                fontWeight="heading"
              >
                Matcher
              </Text>
              <Box height="auto">
                <Matches limit={28} attribute="team.index" />
              </Box>
              <Box textAlign="center" fontSize={2}>
                <Text
                  my={2}
                  fontSize={4}
                  sx={{ fontFamily: "heading" }}
                  fontWeight="heading"
                >
                  {/* <Link
                    style={{ textDecoration: "underline", color: "black" }}
                    to="/leaderboard"
                  >
                    Omgång 2 pågår
                  </Link> */}
                  Spelare
                </Text>
              </Box>

              <PlayerList />
            </Box>
          </motion.div>
        ) : (
          <Box my={2} width={[1, 4 / 5, 3 / 5]} mx="auto">
            <Flex>
              <Flex mx="auto">
                <Heading fontSize={3}>Fullt lag</Heading>
                <Box mx={2}>
                  <FaCheck size={25}></FaCheck>
                </Box>
              </Flex>
            </Flex>
            <Label htmlFor="email">
              <Heading fontSize={0} fontWeight="normal">
                Email
              </Heading>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="din@email.nu"
              onChange={event => setEmail(event.target.value.toLowerCase())}
            />

            <Box textAlign="center">
              {loading ? (
                <Box my={3} mx="auto" color="primary">
                  <Spinner label="Registrerar..." center />
                </Box>
              ) : (
                <Box mt={3} onClick={register}>
                  <Flex fontSize={5}>
                    <Flex mx="auto">
                      <Text
                        mt={2}
                        fontFamily="body"
                        fontWeight="thin"
                        color="black"
                        css={{ textDecoration: "underline" }}
                      >
                        Lämna in
                      </Text>
                      <Box color="primary" mx={2}>
                        <IoMdArrowDroprightCircle
                          size={50}
                        ></IoMdArrowDroprightCircle>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </InstantSearch>
    </Layout>
  )
}

export default GamePage
