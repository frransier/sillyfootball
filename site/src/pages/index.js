import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading, Button, Box, Text, Flex } from "rebass"
import { motion } from "framer-motion"
import { GiSoccerBall } from "react-icons/gi"

const IndexPage = () => (
  <Layout>
    <SEO title="Start" />

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
      <Box>
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
        <Heading textAlign="center" mt={2} sx={{ fontWeight: 1 }}>
          FANTASY FOOTBALL
        </Heading>
      </Box>
      <Box textAlign="center">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 30 }}
          transition={{
            duration: 0.7,
            stiffness: 200,
          }}
        >
          <GiSoccerBall size={75}></GiSoccerBall>
        </motion.div>
        <Heading textAlign="right" fontSize={[1, 2]} mx={[2, 3]}>
          Lördag 13:30
        </Heading>
      </Box>
    </Box>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        stiffness: 200,
      }}
    >
      <Box textAlign="center" mt={3}>
        <Link to="/game/">
          <Button mx={1} fontSize={[5, 6]}>
            <Heading fontWeight="normal" color="black">
              Spela
            </Heading>
          </Button>
        </Link>
      </Box>
    </motion.div>
  </Layout>
)

export default IndexPage
