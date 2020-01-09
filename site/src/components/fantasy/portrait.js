/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { useGameDispatch } from "../../state"

const Portrait = ({ player }) => {
  const gameDispatch = useGameDispatch()
  return (
    <button
      onClick={() => gameDispatch({ type: "remove", player: player.id })}
      sx={{
        appearance: "none",
        bg: "background",
        border: "none",
        mx: [3, 6, 8],
      }}
      aria-label="Player Avatar"
    >
      <div
        sx={{
          maxWidth: 35,
          mx: "auto",
          py: 2,
        }}
      >
        <Image fluid={player.logo} />
      </div>
      <div
        sx={{
          borderBottom: "solid 3px",
          borderBottomColor: "primary",
          p: 2,
          mt: 4,
          width: [90, 100, 110],
        }}
      >
        <Styled.h4
          sx={{
            fontWeight: "body",
            fontFamily: "heading",
            fontSize: [2, 3, 4],
            py: 2,
            my: 0,
            color: "text",
          }}
        >
          {player.name}
        </Styled.h4>
      </div>
    </button>
  )
}

export default Portrait