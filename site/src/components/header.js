import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box } from "rebass"
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"

const icon = {
  hidden: {
    strokeWidth: 19,
  },
  visible: {
    strokeWidth: 4,
  },
}

const Header = () => (
  <Flex
    width={[1, 4 / 5, 3 / 5]}
    mx="auto"
    sx={{ borderWidth: "0px 0px 3px 0px", borderStyle: "solid" }}
  >
    <Link style={{ textDecoration: "none" }} to="/">
      <Heading fontSize={[5, 6]} fontWeight="normal" color="black">
        Sillyfootball
      </Heading>
    </Link>
    <Box mx="auto"></Box>
    <Box fontSize={[5, 6]} mt={[1, 2]}>
      <FaBars></FaBars>
    </Box>
  </Flex>
)

export default Header
