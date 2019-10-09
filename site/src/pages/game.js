import React, { useState } from "react"
import { navigate } from "@reach/router"
import axios from "axios"
import { Flex, Heading, Box, Image, Button } from "rebass"
import { Label, Input } from "@rebass/forms"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PlayerList from "../components/playerList"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import Matches from "../components/matches"
import { useDispatchContext, useStateContext } from "../state"
import { useToast } from "sancho"
import { FaRegTimesCircle } from "react-icons/fa"
import { motion } from "framer-motion"
import { PacmanLoader } from "react-spinners"
//import { Link } from "gatsby"

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
              <Heading textAlign="center" mt={2} sx={{ fontWeight: "normal" }}>
                Välj 5 spelare
              </Heading>
              <Heading
                fontSize={2}
                fontWeight="normal"
                textAlign="center"
                mt={0}
              >
                1 poäng per mål el assist
              </Heading>
              <Heading textAlign="center" mt={2} fontSize={[1, 2]}>
                Lördag 13:30
              </Heading>
            </motion.div>
          ) : (
            <Flex flexWrap="wrap" my={[-4, 3]}>
              {state &&
                state.map((player, index) => {
                  return (
                    <Box mx="auto" width={[1 / 3, 1 / 5]}>
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
                              width="45px"
                              height="45px"
                              src={player.team.logo.asset.url}
                              alt={player.name}
                            ></Image>
                            <Heading fontWeight="normal" fontSize={0} mx="auto">
                              {player.name}
                            </Heading>
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
            <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
              <Heading textAlign="left" fontSize={2} fontWeight="normal">
                Matcher
              </Heading>
              <Box height="auto">
                <Matches limit={28} attribute="team.index" />
              </Box>
              <Box textAlign="left" fontSize={2}>
                <Heading fontWeight="normal">
                  {/* <Link
                    style={{ textDecoration: "underline", color: "black" }}
                    to="/leaderboard"
                  >
                    Omgång 2 pågår
                  </Link> */}
                  Spelare
                </Heading>
              </Box>

              <PlayerList />
            </Box>
          </motion.div>
        ) : (
          <Box my={2} width={[1, 4 / 5, 3 / 5]} mx="auto">
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
                  <PacmanLoader color={"#3cf"}></PacmanLoader>
                </Box>
              ) : (
                <Button mx={1} my={3} fontSize={[5, 6]} onClick={register}>
                  <Heading fontWeight="normal" color="black">
                    Spela
                  </Heading>
                </Button>
              )}
            </Box>
          </Box>
        )}
      </InstantSearch>
    </Layout>
  )
}

export default GamePage
