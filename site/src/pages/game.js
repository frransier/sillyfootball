import React, { useState } from "react"
import { navigate } from "@reach/router"
import axios from "axios"
import { Flex, Card, Heading, Text, Box, Image, Button } from "rebass"
import { Label, Input } from "@rebass/forms"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PlayerList from "../components/playerList"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"
import Matches from "../components/matches"
import { useDispatchContext, useStateContext } from "../state"
import { useToast } from "sancho"

const searchClient = algoliasearch(
  "C1ICPA4UBZ",
  "cc596e105e36167542f65e83e4b04b1a"
)
const GamePage = () => {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState()

  const state = useStateContext()
  const dispatch = useDispatchContext()
  const toast = useToast()

  const register = () => {
    const squad = state && state.map(player => player._id)

    axios
      .post("/.netlify/functions/register", { params: { squad, email, phone } })
      .then(res => {
        res.data === "OK" ? navigate("/thanks/") : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <InstantSearch searchClient={searchClient} indexName="players">
        <Box textAlign="center">
          <Card mx="auto" width={345} height={188} sx={{ borderRadius: 12 }}>
            {state && state.length < 1 ? (
              <Box p={2}>
                <Heading textAlign="left" my={1}>
                  Välj 5 spelare
                </Heading>
                <Heading textAlign="left" my={3}>
                  1 poäng per mål / assist
                </Heading>
                <Text textAlign="left" mt={3}>
                  Deadline day
                </Text>
                <Text textAlign="left">Lördag 28/9 kl 13:25</Text>
              </Box>
            ) : (
              state &&
              state.map((player, index) => {
                return (
                  <Card
                    onClick={() => (
                      toast({
                        title: `${player.name} togs bort från ditt lag`,
                        position: "bottom",
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
                    <Flex>
                      <Image
                        width="18px"
                        height="18px"
                        src={player.team.logo.asset.url}
                      ></Image>
                      <Text mx="auto">{player.name}</Text>
                    </Flex>
                  </Card>
                )
              })
            )}
          </Card>
          {state && state.length < 5 ? (
            <Box>
              <Heading fontSize={2} px={2} my={3}>
                Spelschema
              </Heading>
              <Box mb={2}>
                <Matches limit={28} attribute="team.index" />
              </Box>
              <Heading fontSize={2} px={2} my={3}>
                Välj spelare
              </Heading>
              <PlayerList />
            </Box>
          ) : (
            <Box>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="glenn@gbg.nu"
                onChange={event => setEmail(event.target.value)}
              />
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                name="phone"
                type="number"
                placeholder="0701234567"
                onChange={event => setPhone(event.target.value)}
              />
              <Button onClick={register} my={3}>
                Lämna in
              </Button>
            </Box>
          )}
        </Box>
      </InstantSearch>
    </Layout>
  )
}

export default GamePage
