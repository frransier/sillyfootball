import React from "react"
import { Flex, Card, Heading, Text, Box, Image, Button } from "rebass"
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
  const state = useStateContext()
  const dispatch = useDispatchContext()
  const toast = useToast()
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
                <Heading my={3}>1 poäng per mål / assist</Heading>
                <Text textAlign="right" mt={3}>
                  Deadline day
                </Text>
                <Text textAlign="right">Lördag 21/9 kl 13:25</Text>
              </Box>
            ) : (
              state &&
              state.map((player, index) => {
                return (
                  <Card
                    onClick={() => (
                      toast({
                        title: `${player.name} togs bort från ditt lag`,
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
            <Button my={3}>Lämna in</Button>
          )}
        </Box>
      </InstantSearch>
    </Layout>
  )
}

export default GamePage
