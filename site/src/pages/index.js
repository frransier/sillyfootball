import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import { Heading, Box, Flex } from "rebass"
import { motion } from "framer-motion"
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
                    sx={{ fontWeight: "heading", fontSize: 3, color: "tomato" }}
                  >
                    Jackpot 1500 kr
                  </Heading>

                  <Heading
                    fontWeight="normal"
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                  >
                    Lör 2 november kl 16:00
                  </Heading>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <Nav />
        </Box>
        <Box height="50px"></Box>
        <Flex color="tomato" mx="auto">
          <Box fontSize={6} mx="auto">
            <TextLoop>
              <Heading fontSize={5}>Gratis att spela</Heading>
              <Heading fontSize={5}>Cash money på kontot</Heading>
              <Heading fontSize={5}>Enkelt att lära sig</Heading>
              <Heading fontSize={5}>Går fort att skapa ett lag</Heading>
              <Heading fontSize={5}>Ingen registrering</Heading>
            </TextLoop>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default IndexPage
