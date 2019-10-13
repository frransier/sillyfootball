import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Flex, Box, Text, Button, Heading } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useDispatchContext } from "../state"
import { motion } from "framer-motion"

const ThanksPage = () => {
  const dispatch = useDispatchContext()

  useEffect(() => {
    dispatch({ type: "clear-state" })
  }, [dispatch])

  return (
    <Layout>
      <SEO title="FAQ" />
      <Box width={9 / 10} mx="auto">
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
              <Heading textAlign="center" mt={1} sx={{ fontWeight: "normal" }}>
                Du är reggad!
              </Heading>
              <Heading textAlign="center" mt={2} sx={{ fontWeight: "normal" }}>
                1000 kr FREEROLL
              </Heading>

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
          </motion.div>
        </Box>

        <Flex alignItems="center" justifyContent="center">
          <Box textAlign="center" my={4}>
            <Link to="/game/">
              <Button mx={1}>
                <Heading fontSize={[2, 3]} fontWeight="normal" color="black">
                  Skapa fler lag
                </Heading>
              </Button>
            </Link>
          </Box>
          <Box textAlign="center" my={4}>
            <Link to="/leaderboard/">
              <Button mx={1}>
                <Heading fontSize={[2, 3]} fontWeight="normal" color="black">
                  Leaderboard
                </Heading>
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Layout>
  )
}

export default ThanksPage
