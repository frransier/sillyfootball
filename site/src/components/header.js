import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box, Text } from "rebass"
import { FaBars } from "react-icons/fa"
import { Sheet } from "sancho"

const Header = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Flex
      width={[1, 4 / 5, 3 / 5]}
      mx="auto"
      sx={{ borderWidth: "0px 0px 3px 0px", borderStyle: "solid" }}
    >
      <Link style={{ textDecoration: "none" }} to="/">
        <Heading
          fontFamily="logo"
          fontSize={[6, 7]}
          fontWeight="heading"
          color="black"
        >
          Sillyfootball
        </Heading>
      </Link>

      <Text mx={2} fontWeight="bold" color="tomato">
        beta
      </Text>

      <Box mx="auto"></Box>
      <Box onClick={() => setOpen(!open)} fontSize={[5, 6]} mt={[1, 2]}>
        <FaBars></FaBars>
      </Box>
      <Box>
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
      </Box>
    </Flex>
  )
}

export default Header
