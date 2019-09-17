import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import { Heading, Button, Box, Text } from "rebass"
import TextLoop from "react-text-loop"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box p={[3, 4, 5]} mx="auto">
      <Heading textAlign="center" my={2} fontSize={[3, 4, 5]}>
        Som{" "}
        <TextLoop
          interval={5000}
          springConfig={{ stiffness: 180, damping: 20 }}
        >
          <Text>Drömelvan</Text>
          <Text>Fantasy PL</Text>
          <Text>Draftkings</Text>
        </TextLoop>{" "}
        fast 1000x{" "}
        <TextLoop
          interval={4000}
          springConfig={{ stiffness: 400, damping: 20 }}
        >
          <Text>bättre</Text>
          <Text>enklare</Text>
          <Text>roligare</Text>
        </TextLoop>
      </Heading>
      <Box textAlign="center" mt={4}>
        <Link to="/game/">
          <Button mr={2} fontSize={[2, 4, 6]}>
            Spela nu
          </Button>
        </Link>
        <Link to="/faq/">
          <Button fontSize={[2, 4, 6]}>FAQ</Button>
        </Link>
      </Box>
    </Box>
  </Layout>
)

export default IndexPage
