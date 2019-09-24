import React from "react"
import { connectInfiniteHits } from "react-instantsearch-dom"
import Player from "../components/player"
import { Button, Box } from "rebass"
import { motion } from "framer-motion"

const PlayerList = ({ hits, hasMore, refineNext }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          stiffness: 200,
        }}
      >
        {hits.map((hit, index) => (
          <Player key={index} index={index} hit={hit} />
        ))}
        <Box textAlign="center" py={2}>
          <Button height="30px" disabled={!hasMore} onClick={refineNext}>
            Visa fler
          </Button>
        </Box>
      </motion.div>
    </>
  )
}

export default connectInfiniteHits(PlayerList)
