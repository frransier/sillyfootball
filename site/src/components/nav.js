import { Link } from "gatsby"
import React from "react"
import { Flex, Box, Button } from "rebass"

const Nav = () => {
  return (
    <Flex width={[1, 4 / 5, 3 / 5]} mx="auto">
      <Flex mx="auto" fontSize={2} p={2}>
        <Box
          mx={1}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 450,
              color: "tomato",
            }}
            to="/game/"
          >
            <Button
              sx={{
                fontWeight: "heading",
                fontFamily: "heading",
              }}
              bg="primary"
              fontSize={3}
            >
              Spela
            </Button>
          </Link>
        </Box>

        <Box
          mx={1}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 450,
              color: "tomato",
            }}
            to="/leaderboard/"
          >
            <Button
              sx={{
                fontWeight: "heading",
                fontFamily: "heading",
              }}
              bg="primary"
              fontSize={3}
            >
              Leaderboard
            </Button>
          </Link>
        </Box>
        <Box
          mx={1}
          sx={{
            textAlign: "center",
            fontFamily: "heading",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            activeStyle={{
              fontWeight: 450,
              color: "tomato",
            }}
            to="/white-paper/"
          >
            <Button
              sx={{
                fontWeight: "heading",
                fontFamily: "heading",
              }}
              bg="primary"
              fontSize={3}
              variant="primary"
              width="120px"
            >
              Så funkar det
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Nav
