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
        bg: player ? "secondary" : "background",
        p: 0,
        width: "100%",
        height: 70,
        borderTop: "solid 1.5px",
        borderTopColor: player ? "primary" : "background"
        // borderBottom: "solid 0.5px",
        // borderBottomColor: "darkgrey"
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
          <Styled.h2
            sx={{
              fontSize: 5,
              bg: "secondary",
              width: 50,
              height: 50,
              pl: 2,
              mt: 4,
              boxShadow: "2px 2px 4px darkgrey",
              alignSelf: "end",
              justifySelf: "center",
              display: "grid",
              alignItems: "center",
              borderRadius: 999,
              color: player ? "background" : "primary"
            }}
          >
            {index.toString()}
          </Styled.h2>
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
