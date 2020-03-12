/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { useGameState } from "../../state"
import Portrait from "./portrait"
import fantasy from "../../images/silly3.svg"
import fantasyDark from "../../images/silly3-dark.svg"
import { FaAngleRight } from "react-icons/fa"
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
        top: 43,
        zIndex: 1000,
      }}
    >
      {gameState && gameState.length === 0 ? (
        <div
          sx={{
            display: "grid",
            justifyItems: "start",
            my: 0,
            mx: 5,
          }}
        >
          <img
            sx={{
              width: "69%",
              my: 5,
            }}
            src={colorMode === "default" ? fantasy : fantasyDark}
            alt="Fantasy Football"
          />

          <div sx={{ display: "flex", alignItems: "center", my: 7 }}>
            <Styled.h1
              sx={{
                my: 0,
              }}
            >
              {deadline}
            </Styled.h1>
          </div>
          <Link to="/regler/" style={{ textDecoration: "none" }}>
            <div
              sx={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Styled.h2 sx={{ my: 4 }}>Så funkar det</Styled.h2>
              <Styled.h2 sx={{ mx: 2, my: 4 }}>
                <div sx={{ mt: 3 }}>
                  <FaAngleRight />
                </div>
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
