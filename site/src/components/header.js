import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box, Text, Image } from "rebass"
import { FaBars } from "react-icons/fa"
import { Sheet } from "sancho"
import header from "../images/logo.webp"

const Header = () => {
  return (
    <Flex width={[1, 4 / 5, 3 / 5]} mx="auto">
      <Flex mx="auto">
        <Link style={{ textDecoration: "none" }} to="/">
          <Flex mx="auto">
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
            <Heading color="black" mt={2} fontSize={7} fontFamily="logo">
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
