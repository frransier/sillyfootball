import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import { Heading, Button, Box, Text } from "rebass"
import TextLoop from "react-text-loop"
import { motion } from "framer-motion"

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />
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
      <Heading textAlign="center" pt={4} my={2} fontSize={[3, 4, 5]}>
        Omgång 1 är nu klar
      </Heading>
      <Heading textAlign="center" pt={4} my={2} fontSize={[3, 4, 5]}>
        Vinnarna har kontaktats via mail
      </Heading>
      <Heading textAlign="center" my={2} fontSize={[3, 4, 5]}>
        Nästa omgång presenteras
      </Heading>
      <Heading textAlign="center" my={2} fontSize={[3, 4, 5]}>
        Onsdag 2 oktober kl 21.00
      </Heading>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          stiffness: 200,
        }}
      >
        <Box textAlign="center" mt={4}>
          <Link to="/faq/">
            <Button variant="outline" color="black" mx={2} fontSize={[2, 4, 6]}>
              Så funkar det
            </Button>
          </Link>
          <Link to="/game/">
            <Button mx={1} fontSize={[2, 4, 6]}>
              Spela
            </Button>
          </Link>
        </Box>
        <Box textAlign="center" mt={3}>
          <Link to="/leaderboard/">
            <Button variant="outline" color="black" fontSize={[2, 4, 6]}>
              Leaderboard
            </Button>
          </Link>
        </Box>
      </motion.div>
    </Box>
  </Layout>
)

export default IndexPage
