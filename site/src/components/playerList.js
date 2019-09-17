import React from "react"
import { connectInfiniteHits } from "react-instantsearch-dom"
import Player from "../components/player"
import { Button, Box } from "rebass"

const PlayerList = ({ hits, hasMore, refineNext }) => {
  return (
    <>
      {hits.map((hit, index) => (
        <Player key={index} index={index} hit={hit} />
      ))}
      <Box textAlign="center" py={2}>
        <Button height="30px" disabled={!hasMore} onClick={refineNext}>
          Visa fler
        </Button>
      </Box>
    </>
  )
}

export default connectInfiniteHits(PlayerList)
