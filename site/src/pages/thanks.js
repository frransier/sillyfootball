import React, { useEffect } from "react"
import { Box, Heading } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useDispatchContext } from "../state"
import { motion } from "framer-motion"
import Nav from "../components/nav"

const ThanksPage = () => {
  const dispatch = useDispatchContext()

  useEffect(() => {
    dispatch({ type: "clear-state" })
  }, [dispatch])

  return (
    <Layout>
      <SEO title="FAQ" />
      <Box mx="auto">
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
            <Box
              mx="auto"
              p={2}
              width={3 / 4}
              sx={{ borderRadius: 10 }}
              bg="#3D7650"
            >
              <Box textAlign="center" verticalAlign="center">
                <Heading
                  color="white"
                  textAlign="center"
                  fontSize={(4, 5)}
                  sx={{ fontWeight: "normal" }}
                >
                  Du är reggad!
                </Heading>
                <Box color="white">
                  <Heading
                    textAlign="center"
                    sx={{ fontWeight: "heading", color: "tomato", fontSize: 3 }}
                  >
                    500 kronor
                  </Heading>

                  <Heading
                    fontWeight="normal"
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                  >
                    Tis 26 nov kl 21:00
                  </Heading>
                  <Heading
                    fontWeight="normal"
                    my={[1, 2]}
                    textAlign="center"
                    fontSize={[1, 2]}
                    mx={[2, 3]}
                  >
                    Kolla din mail
                  </Heading>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>
        <Nav></Nav>
      </Box>
    </Layout>
  )
}

export default ThanksPage
