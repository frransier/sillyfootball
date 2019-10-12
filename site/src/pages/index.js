import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading, Button, Box, Text } from "rebass"
import { motion } from "framer-motion"

import { FaStar } from "react-icons/fa"

const IndexPage = () => {
  return (
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
        </Box>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,

            stiffness: 200,
          }}
        >
          <Box textAlign="center" verticalAlign="center">
            <Heading textAlign="center" mt={2} sx={{ fontWeight: 1 }}>
              FANTASY FOOTBALL
            </Heading>
            <FaStar size={15}></FaStar>
            <FaStar size={15}></FaStar>
            <FaStar size={15}></FaStar>
            <Text
              my={[2, 3]}
              textAlign="center"
              fontSize={[1, 2]}
              mx={[2, 3]}
              sx={{ fontFamily: "body" }}
            >
              Lördag 19 oktober kl 13:00
            </Text>
          </Box>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.3,
          stiffness: 200,
        }}
      >
        <Box textAlign="center" mt={3}>
          <Link to="/game/">
            <Button mx={1} fontSize={[5, 6]}>
              <Heading fontWeight="normal" color="black">
                Till spelet
              </Heading>
            </Button>
          </Link>
        </Box>
      </motion.div>
    </Layout>
  )
}

export default IndexPage
