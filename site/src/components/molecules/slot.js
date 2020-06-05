/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"

const Slot = ({ player, dispatch, index }) => {
  return (
    <button
      sx={{
        appearance: "none",
        outline: "none",
        border: "none",

        cursor: "pointer",
        bg: "secondary",
        p: 0,
        width: "100%",
        height: 70,
        borderTop: player ? "solid 1.5px" : "none",
        borderTopColor: "primary"
      }}
      onClick={dispatch}
    >
      <div
        sx={{
          // bg: "secondary",
          height: "100%",
          width: "100%",
          display: "grid"
        }}
      >
        {player ? (
          <Image
            sx={{ alignSelf: "center", justifySelf: "center", mt: 4 }}
            fixed={player.team.logo.asset.fixed}
          />
        ) : (
          <Styled.h1
            sx={{
              fontSize: 5,
              mt: "22px",
              alignSelf: "end",
              justifySelf: "center",
              color: "background"
            }}
          >
            {index}
          </Styled.h1>
        )}
        <Styled.p
          sx={{
            fontSize: 1,
            fontWeight: 600,
            width: "100%",
            my: 3,
            alignSelf: "center",
            color: player ? "background" : "secondary"
          }}
        >
          {player ? player.name || player.fullName : null}
        </Styled.p>
      </div>
    </button>
  )
}

export default Slot
