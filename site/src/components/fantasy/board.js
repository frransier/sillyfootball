/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { useGameState } from "../../state"
import Portrait from "./portrait"
import pick from "../../images/pick.svg"
import pickDark from "../../images/pick-dark.svg"
import winDark from "../../images/win-dark.svg"
import win from "../../images/win.svg"

const Board = () => {
  const gameState = useGameState()
  const [colorMode] = useColorMode()

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
        <div
          sx={{
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            py: 7,
          }}
        >
          <img
            sx={{
              width: 200,
              height: 35,
              mx: "auto",
              mt: 3,
            }}
            src={colorMode === "default" ? pick : pickDark}
            alt="Fantasy Football"
          />
          <img
            sx={{
              width: 220,
              height: 35,
              mx: "auto",
            }}
            src={colorMode === "default" ? win : winDark}
            alt="Fantasy Football"
          />

          <div sx={{ mx: "auto", my: 0 }}>
            <Styled.h1
              sx={{
                borderBottom: "solid 3px",
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
