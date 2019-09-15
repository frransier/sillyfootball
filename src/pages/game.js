import React from "react"
import { Link } from "gatsby"
import { Card, Heading, Text, Box } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"

const GamePage = () => (
  <Layout>
    <SEO title="Page two" />
    <Box>
      <Card width={345} height={152}>
        <Box p={2}>
          <Heading my={1}>Välj 5 spelare</Heading>
          <Heading my={1}>1 poäng per mål / assist</Heading>
          <Text color="primary" textAlign="right" mt={3}>
            Deadline day
          </Text>
          <Text textAlign="right">Tisdag 17/11 kl 20:45</Text>
        </Box>
      </Card>
      <Heading my={1}>Matcher</Heading>
    </Box>
  </Layout>
)

export default GamePage
