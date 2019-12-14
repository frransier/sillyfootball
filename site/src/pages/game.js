import React, { useState } from "react"
import { navigate } from "@reach/router"
import axios from "axios"
import { Flex, Heading, Box, Image, Text, Button } from "rebass"
import { Label, Input } from "@rebass/forms"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import PlayerList from "../components/playerList"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import Matches from "../components/matches"
import { useDispatchContext, useStateContext } from "../state"
import { Spinner } from "sancho"
import { FaRegTimesCircle, FaCheck, FaRegHeart } from "react-icons/fa"
import { motion } from "framer-motion"
import { Link } from "gatsby"

const searchClient = algoliasearch(
  "C1ICPA4UBZ",
  "cc596e105e36167542f65e83e4b04b1a"
)
const GamePage = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const state = useStateContext()
  const dispatch = useDispatchContext()

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
            zIndex: 5000,
          }}
          // eslint-disable-next-line
          css={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
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
              <Box
                mx="auto"
                p={2}
                width={3 / 4}
                sx={{ borderRadius: 10 }}
                bg="white"
              >
                <Flex mx="auto">
                  <Box mx="auto">
                    <Heading
                      color="black"
                      textAlign="center"
                      fontSize={(4, 5)}
                      sx={{ fontWeight: "normal" }}
                    >
                      Välj 5 spelare
                    </Heading>
                  </Box>
                  <Box mt={1} color="primary">
                    <FaRegHeart size={20} />
                  </Box>
                </Flex>

                <Box color="black">
                  <Heading
                    textAlign="center"
                    sx={{ fontWeight: "normal", fontSize: 3 }}
                  >
                    1 poäng per mål el assist
                  </Heading>

                  <Heading
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[3, 2]}
                    mx={[2, 3]}
                    color="tomato"
                    fontWeight="heading"
                  >
                    500 kr
                  </Heading>
                  <Heading
                    fontWeight="normal"
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[3, 2]}
                    mx={[2, 3]}
                    color="black"
                  >
                    Spelstopp Lördag 14 dec kl 15:30
                  </Heading>
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
                        initial={{ y: 50, scale: 2 }}
                        animate={{ y: 0, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          stiffness: 200,
                        }}
                      >
                        <Box
                          onClick={() => dispatch({ type: "remove", index })}
                          sx={{ borderRadius: 12 }}
                          key={index}
                          textAlign="center"
                        >
                          <Box>
                            <Image
                              width="35px"
                              height="35px"
                              src={player.team.logo.asset.url}
                              alt={player.name}
                            ></Image>
                            <Text
                              color="black"
                              sx={{ fontFamily: "body" }}
                              fontWeight="normal"
                              fontSize={[1, 2]}
                              fontFamily="heading"
                              mx="auto"
                            >
                              {player.name}
                            </Text>
                            <Box mt={1} color="black">
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
            <Box
              m={2}
              sx={{
                textAlign: "center",
                fontFamily: "heading",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                activeStyle={{
                  fontWeight: 450,
                  color: "tomato",
                }}
                to="/white-paper/"
              >
                <Button
                  sx={{
                    fontWeight: "heading",
                    fontFamily: "heading",
                  }}
                  bg="primary"
                  fontSize={3}
                  variant="primary"
                  width="120px"
                >
                  Så funkar det
                </Button>
              </Link>
            </Box>
            <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
              <Text
                my={2}
                sx={{ fontFamily: "heading" }}
                textAlign="left"
                fontSize={3}
                fontWeight="heading"
              >
                Matcher
              </Text>
              <Box height="auto">
                <Matches limit={28} attribute="team.index" />
              </Box>
              <Box fontFamily="heading" textAlign="center" fontSize={6} mt={3}>
                {/* <Text
                  my={2}
                  fontSize={4}
                  sx={{ fontFamily: "heading" }}
                  fontWeight="heading"
                >
                  Spelare
                </Text>
                <PlayerList /> */}
                <Link
                  style={{ textDecoration: "none", color: "tomato" }}
                  to="/leaderboard"
                >
                  Omgång 13 pågår >
                </Link>
              </Box>
            </Box>
          </motion.div>
        ) : (
          <Box my={1} width={[1, 4 / 5, 3 / 5]} mx="auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                delay: 0.3,
                stiffness: 200,
              }}
            >
              <Flex>
                <Flex mx="auto">
                  <Heading fontSize={3}>Fullt lag</Heading>
                  <Box mx={2} my={-1}>
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

              <Box textAlign="left">
                {loading ? (
                  <Box my={3} mx="auto" color="primary">
                    <Spinner label="Registrerar..." center />
                  </Box>
                ) : email.length > 3 ? (
                  <Box
                    mt={2}
                    sx={{
                      textAlign: "left",
                      fontFamily: "heading",
                    }}
                    onClick={register}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        delay: 0.3,
                        stiffness: 200,
                      }}
                    >
                      <Button
                        width="100%"
                        sx={{
                          fontWeight: "heading",
                          fontFamily: "heading",
                        }}
                        bg="primary"
                        fontSize={4}
                        variant="primary"
                      >
                        Lämna in
                      </Button>
                    </motion.div>
                  </Box>
                ) : (
                  <Heading height="43px" color="tomato">
                    Email saknas
                  </Heading>
                )}
              </Box>
              {email.length < 4 ? <Nav /> : null}
            </motion.div>
          </Box>
        )}
      </InstantSearch>
    </Layout>
  )
}

export default GamePage
