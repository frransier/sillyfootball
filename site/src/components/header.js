import { Link } from "gatsby"
import React from "react"
import { Flex, Heading, Text, Box } from "rebass"
import { motion } from "framer-motion"
import { GiSoccerBall } from "react-icons/gi"

const Header = () => (
  <Flex
    sx={{
      fontFamily: "heading",
      alignItems: "center",
      px: 5,
    }}
  >
    <motion.div
      alignItems="center"
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={{
        yoyo: 6,
        duration: 1,
        stiffness: 200,
      }}
    >
      <Box mr={0} fontSize={[5, 6, 7]}>
        <GiSoccerBall></GiSoccerBall>
      </Box>
    </motion.div>
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
