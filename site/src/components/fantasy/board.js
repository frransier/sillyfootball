/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { useGameState } from "../../state"
import { FaAngleRight } from "react-icons/fa"
import Portrait from "./portrait"
import pick from "../../images/pick.svg"
import pickDark from "../../images/pick-dark.svg"
import winDark from "../../images/win-dark.svg"
import win from "../../images/win.svg"
import { Link } from "gatsby"

const Board = ({ deadline }) => {
  const gameState = useGameState()
  const [colorMode] = useColorMode()

  return (
    <div
      sx={{
        height: ["170px", "180px", "180px"],
        width: ["100%"],
        borderBottom: "solid 4px",
        borderBottomColor: "muted",
        mb: 2,
        bg: "background",
        position: "sticky",
        top: 60,
        zIndex: 1000,
      }}
    >
      {gameState && gameState.length === 0 ? (
        <div
          sx={{
            display: "grid",
            gridTemplateRows: "20% 30% 30% 20%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <img
            sx={{
              width: 250,
              height: 23,
              mx: "auto",
              mt: 6,
            }}
            src={colorMode === "default" ? pick : pickDark}
            alt="Fantasy Football"
          />
          <img
            sx={{
              width: 250,
              height: 20,
              mx: "auto",
              mt: 7,
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
              {deadline}
            </Styled.h1>
          </div>
          <Link to="/regler/" style={{ textDecoration: "none" }}>
            <div sx={{ display: "flex", cursor: "pointer" }}>
              <Styled.h2 sx={{ my: 6, textDecoration: "underline" }}>
                Så funkar det
              </Styled.h2>
            </div>
          </Link>
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
                if (i > 2)
                  return (
                    <div key={i} sx={{ my: 4 }}>
                      <Portrait player={x} />
                    </div>
                  )
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
