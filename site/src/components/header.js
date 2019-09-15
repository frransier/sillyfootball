import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Text, Box } from "rebass"
import { FaBars, FaBasketballBall } from "react-icons/fa"

const Header = () => (
  <Flex
    sx={{
      fontFamily: "heading",
      px: 2,
      background: "white",
      alignItems: "center",
    }}
  >
    <Box fontSize={[5, 6, 7]}>
      <FaBasketballBall></FaBasketballBall>
    </Box>
    <Link style={{ textDecoration: "none" }} to="/">
      <Heading color="primary" fontSize={[5, 6, 7]} fontWeight="display" p={2}>
        sillyfootball
      </Heading>
    </Link>
    <Text color="primary" fontSize={1}>
      beta
    </Text>
    <Box mx="auto" />
    <Link to="/page-2/">
      <Heading color="primary" fontSize={[4, 5, 6]} p={2}>
        <FaBars></FaBars>
      </Heading>
    </Link>
  </Flex>
)

export default Header
