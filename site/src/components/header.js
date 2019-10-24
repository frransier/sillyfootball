import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box, Image } from "rebass"
import header from "../images/logo.png"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <Flex width={[1, 4 / 5, 3 / 5]} mx="auto">
      <Flex mx="auto">
        <Link style={{ textDecoration: "none" }} to="/">
          <Flex mx="auto">
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                stiffness: 200,
              }}
            >
              <Box
                ml={-1}
                mr={1}
                my={2}
                width={50}
                height={50}
                borderRadius={1000}
              >
                <Image src={header}></Image>
              </Box>
            </motion.div>
            <Heading color="black" mt={1} fontSize={7} fontFamily="heading">
              illyfootball
            </Heading>
          </Flex>
        </Link>
      </Flex>

      {/* <Box>
        <Sheet onRequestClose={() => setOpen(!open)} isOpen={open}>
          <Link style={{ textDecoration: "none" }} to="/white-paper/">
            <Heading color="black" fontWeight={1} pt={4} mx={4}>
              White Paper
            </Heading>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/leaderboard/">
            <Heading color="black" fontWeight={1} mt={2} mx={4}>
              Leaderboard
            </Heading>
          </Link>
        </Sheet>
      </Box> */}
    </Flex>
  )
}

export default Header
