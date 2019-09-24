import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Text, Box } from "rebass"
import { motion } from "framer-motion"
import { GiSoccerBall } from "react-icons/gi"

const icon = {
  hidden: {
    pathLength: 0,
    strokeWidth: 0,
  },
  visible: {
    pathLength: 1,
    strokeWidth: 9.9174,
  },
}

const Header = () => (
  <Flex
    sx={{
      fontFamily: "heading",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Link style={{ textDecoration: "none" }} to="/">
      <Heading color="primary" fontSize={[5, 6, 7]} fontWeight="display" p={2}>
        sillyfootball
      </Heading>
    </Link>
    <Text color="primary" fontSize={1}>
      beta
    </Text>
  </Flex>
)

export default Header
