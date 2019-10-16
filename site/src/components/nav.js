import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box, Text, Image } from "rebass"

const Nav = () => {
  return (
    <Flex width={[1, 4 / 5, 3 / 5]} mx="auto">
      <Flex mx="auto">
        <Box
          mr={3}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 700,
              color: "tomato",
            }}
            to="/game/"
          >
            <Text my={1}>Spela</Text>
          </Link>
        </Box>
        <Box
          mr={3}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 700,
              color: "tomato",
            }}
            to="/thanks/"
          >
            <Text my={1}>Regler</Text>
          </Link>
        </Box>
        <Box
          mr={3}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 700,
              color: "tomato",
            }}
            to="/leaderboard/"
          >
            <Text my={1}>Leaderboard</Text>
          </Link>
        </Box>
        <Box
          mr={3}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 700,
              color: "tomato",
            }}
            to="/white-paper/"
          >
            <Text my={1}>White Paper</Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Nav
