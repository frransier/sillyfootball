import React from "react"
import { connectInfiniteHits } from "react-instantsearch-dom"
import Player from "../components/player"
import { Button, Box } from "rebass"

import { Table, TableHead, TableRow, TableCell, TableBody } from "sancho"

const PlayerList = ({ hits, hasMore, refineNext }) => {
  return (
    <>
      <Table fixed={["11%", "45%", "15%", "15%", "14%"]}>
        <TableHead>
          <TableRow>
            <TableCell>Spelare</TableCell>
            <TableCell></TableCell>
            <TableCell align="center">Mål</TableCell>
            <TableCell align="center">Ass</TableCell>
            <TableCell align="center">Välj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits.map(player => {
            return <Player key={player.name} hit={player}></Player>
          })}
        </TableBody>
      </Table>

      <Box textAlign="center" py={3}>
        <Button
          width={[1 / 2, 1]}
          fontSize={3}
          bg="primary"
          color="black"
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
