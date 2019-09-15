import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import { Heading, Button, Box, Text } from "rebass"
import TextLoop from "react-text-loop"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box p={[4, 5, 6]} mx="auto">
      <Heading my={3} fontSize={[3, 4, 5]}>
        Som{" "}
        <TextLoop
          interval={2000}
          springConfig={{ stiffness: 180, damping: 20 }}
        >
          <Text>Drömelvan</Text>
          <Text>Fantasy PL</Text>
          <Text>Draftkings</Text>
        </TextLoop>{" "}
        fast 1000x{" "}
        <TextLoop
          interval={1000}
          springConfig={{ stiffness: 400, damping: 20 }}
        >
          <Text>bättre</Text>
          <Text>snabbare</Text>
          <Text>enklare</Text>
          <Text>roligare</Text>
        </TextLoop>
      </Heading>
      <Link to="/game/">
        <Button fontSize={[2, 4, 6]}>Spela nu</Button>
      </Link>
    </Box>
  </Layout>
)

export default IndexPage
