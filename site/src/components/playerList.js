import React from "react"
import { connectInfiniteHits } from "react-instantsearch-dom"
import Player from "../components/player"
import { Button, Box } from "rebass"
import { motion } from "framer-motion"

const PlayerList = ({ hits, hasMore, refineNext }) => {
  return (
    <>
      {hits.map((hit, index) => (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            duration: 2,
            stiffness: 200,
          }}
        >
          <Player key={index} index={index} hit={hit} />
        </motion.div>
      ))}
      <Box textAlign="center" py={2}>
        <Button
          width={1}
          fontSize={3}
          bg="black"
          color="primary"
          disabled={!hasMore}
          onClick={refineNext}
        >
          Visa fler
        </Button>
      </Box>
    </>
  )
}

export default connectInfiniteHits(PlayerList)
