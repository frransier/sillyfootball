import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading, Button, Box, Text, Flex } from "rebass"
import { motion } from "framer-motion"
import { IoMdArrowDroprightCircle } from "react-icons/io"

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
            <Heading
              color="white"
              textAlign="center"
              mt={2}
              fontSize={(4, 5)}
              sx={{ fontWeight: "thin" }}
            >
              Enkel Fantasy Football
            </Heading>
            <Box color="white">
              <Text
                textAlign="center"
                mt={2}
                sx={{ fontWeight: "thin", fontSize: 3, fontFamily: "body" }}
              >
                Tävla om 1000 kr
              </Text>

              <Text
                my={[1, 2]}
                textAlign="center"
                fontSize={[1, 2]}
                mx={[2, 3]}
                sx={{ fontFamily: "body" }}
              >
                Lördag 19 oktober kl 13:00
              </Text>
            </Box>
          </Box>
        </motion.div>
      </Box>
      <Box mx="auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            stiffness: 200,
          }}
        >
          <Box mt={3}>
            <Link style={{ textDecoration: "none" }} to="/game/">
              <Flex fontSize={5}>
                <Flex mx="auto">
                  <Text
                    mt={2}
                    fontFamily="body"
                    fontWeight="thin"
                    color="black"
                  >
                    Spela
                  </Text>
                  <Box color="primary" mx={2}>
                    <IoMdArrowDroprightCircle
                      size={50}
                    ></IoMdArrowDroprightCircle>
                  </Box>
                </Flex>
              </Flex>
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Layout>
  )
}

export default IndexPage
