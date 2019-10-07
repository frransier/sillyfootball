import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Box, Text } from "rebass"
import { FaBars } from "react-icons/fa"
import { Sheet } from "sancho"
import { motion } from "framer-motion"

const icon = {
  hidden: {
    strokeWidth: 19,
  },
  visible: {
    strokeWidth: 4,
  },
}

const Header = () => {
  const [open, setOpen] = React.useState(false)
  return (
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
      <Box onClick={() => setOpen(!open)} fontSize={[5, 6]} mt={[1, 2]}>
        <FaBars></FaBars>
      </Box>
      <Sheet onRequestClose={() => setOpen(!open)} isOpen={open}>
        <Link to="/leaderboard/">
          <Heading fontWeight={1} mx={2}>
            Leaderboard
          </Heading>
        </Link>
        <Heading fontWeight={1} mx={2}>
          FAQ
        </Heading>
        <Heading fontWeight={1} mx={2}>
          White paper
        </Heading>
      </Sheet>
    </Flex>
  )
}

export default Header
