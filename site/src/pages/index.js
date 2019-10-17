import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import { Heading, Box, Flex } from "rebass"
import { motion } from "framer-motion"
import { FaCheck } from "react-icons/fa"
import TextLoop from "react-text-loop"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Start" />
      <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
        <Box
          bg="white"
          mx="auto"
          height={200}
          sx={{
            borderColor: "black",
            borderStyle: "solid",
            borderRadius: "0px 0px 10px 10px",
            borderWidth: "0px 1px 1px 1px",
          }}
        >
          <Box>
            <Box
              width={1 / 2}
              mx="auto"
              bg="white"
              height={50}
              sx={{
                borderWidth: "6px",
                borderColor: "primary",
                borderStyle: "solid",
                borderTop: "none",
                borderRadius: "0px 0px 10px 10px",
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
            <Box mx="auto" p={2} width={3 / 4} sx={{ borderRadius: 10 }}>
              <Box textAlign="center" verticalAlign="center">
                <Heading
                  color="black"
                  textAlign="center"
                  fontSize={(4, 5)}
                  sx={{ fontWeight: "normal" }}
                >
                  Fantasy Football
                </Heading>
                <Box color="black">
                  <Heading
                    textAlign="center"
                    sx={{ fontWeight: "normal", fontSize: 3 }}
                  >
                    Tävla om 1000 kr
                  </Heading>

                  <Heading
                    fontWeight="normal"
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                  >
                    Lördag 19 oktober kl 13:00
                  </Heading>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <Nav />
        </Box>
        <Flex color="tomato" my={2} mx={3}>
          <TextLoop>
            <Heading textAlign="center">Gratis att spela</Heading>
            <Heading textAlign="center">Cash money på kontot</Heading>
            <Heading textAlign="center">Enkelt att lära sig</Heading>
            <Heading textAlign="center">Går fort att skapa ett lag</Heading>
            <Heading textAlign="center">Ingen registrering</Heading>
          </TextLoop>
          <Box mx={3} textAlign="center" mt={1}>
            <FaCheck></FaCheck>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default IndexPage
