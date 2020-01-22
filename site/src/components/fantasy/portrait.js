/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { useGameDispatch } from "../../state"
import { motion } from "framer-motion"

const Portrait = ({ player }) => {
  const gameDispatch = useGameDispatch()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <button
        onClick={() => gameDispatch({ type: "remove", player: player.id })}
        sx={{
          appearance: "none",
          bg: "background",
          border: "none",
          mx: [3, 6, 8],
          cursor: "pointer",
          outline: "none",
        }}
        aria-label="Player Avatar"
      >
        <div
          sx={{
            maxWidth: 40,
            mx: "auto",
            py: 2,
            minHeight: 40,
          }}
        >
          <Image fluid={player.logo} />
        </div>
        <div
          sx={{
            bg: "background",
            color: "primary",
            borderBottomColor: "text",
            borderBottom: "solid 1px",
            p: 2,
            mt: 4,
            width: [90, 100, 110],
          }}
        >
          <Styled.h4
            sx={{
              fontWeight: "heading",
              fontFamily: "body",
              fontSize: [2, 3],
              py: 2,
              my: 0,
              color: "text",
            }}
          >
            {player.name}
          </Styled.h4>
        </div>
      </button>
    </motion.div>
  )
}

export default Portrait
