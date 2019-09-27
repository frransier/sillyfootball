import { Link } from "gatsby"
import React from "react"
import { Flex } from "rebass"
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
    sx={{
      fontFamily: "heading",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Link style={{ textDecoration: "none" }} to="/">
      <motion.div
        animate={{
          rotate: 360,
        }}
      >
        <svg width="150" height="150">
          <motion.circle
            fill="none"
            stroke="#3cf"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 1 },
            }}
            cx="75"
            cy="75"
            r="50"
          />
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            fill="black"
            font-size="14px"
            font-family="Arial"
            dy=".3em"
          >
            Sillyfootball
          </text>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="#3cf"
            font-size="10px"
            font-family="Arial"
            dy=".3em"
          >
            beta
          </text>
        </svg>
      </motion.div>
    </Link>
  </Flex>
)

export default Header
