import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Flex, Box, Text, Button } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useDispatchContext } from "../state"

const ThanksPage = () => {
  const dispatch = useDispatchContext()

  useEffect(() => {
    dispatch({ type: "clear-state" })
  }, [dispatch])

  return (
    <Layout>
      <SEO title="FAQ" />
      <Box width={9 / 10} mx="auto">
        <Text my={4} textAlign="center" mx={3}>
          Tack för ditt bidrag & lycka till!
        </Text>
        <Flex alignItems="center" justifyContent="center">
          <Link to="/game/">
            <Button mr={2}>Skapa nytt lag</Button>
          </Link>
          <Link to="/leaderboard/">
            <Button>Leaderboard</Button>
          </Link>
        </Flex>
      </Box>
    </Layout>
  )
}

export default ThanksPage
