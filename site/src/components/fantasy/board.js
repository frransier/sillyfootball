/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useGameState } from "../../state"
import Portrait from "./portrait"

const Board = () => {
  const gameState = useGameState()

  return (
    <div
      sx={{
        height: ["160px", "170px", "180px"],
        width: ["100%"],
        borderBottom: "solid 2px",
        borderBottomColor: "muted",
        mb: 2,
      }}
    >
      {gameState && gameState.length === 0 ? (
        <div sx={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr" }}>
          <Styled.h1 sx={{ my: 3, mx: "auto" }}>Välj 5 spelare</Styled.h1>
          <Styled.h1 sx={{ my: 3, mx: "auto" }}>Vinn 500 kronor</Styled.h1>
          <div sx={{ mx: "auto", my: 0 }}>
            <Styled.h1
              sx={{
                borderBottom: "solid 1px",
                borderBottomColor: "primary",
                my: 3,
              }}
            >
              Lör 18 jan kl 15:30
            </Styled.h1>
          </div>
        </div>
      ) : (
        gameState && (
          <div>
            <div
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
              }}
            >
              {gameState.map((x, i) => {
                if (i < 3) return <Portrait key={i} player={x} />
                return null
              })}
            </div>
            <div
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {gameState.map((x, i) => {
                if (i > 2) return <Portrait key={i} player={x} />
                return null
              })}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Board
