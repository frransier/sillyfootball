/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaUser } from "react-icons/fa"
import Image from "gatsby-image"
import Frame from "../atoms/frame"

const Slot = ({ player, dispatch, index }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        p: 0,
        width: "100%",
        height: 70,
        appearance: "none",
        outline: "none",
        bg: player ? "secondary" : "background",
        border: "none",
        // borderTop: player ? "solid 3px" : "none",
        borderTopColor: "primary"
      }}
      onClick={dispatch}
    >
      {/* <div
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      > */}
      {player ? (
        <Image sx={{ mt: 1, mb: 0 }} fixed={player.team.logo.asset.fixed} />
      ) : (
        // <Frame borderWidth={2} borderRadius={6}>
        <div
          sx={{
            bg: "secondary",
            height: "100%",
            width: "100%",
            // borderRadius: 2,
            display: "grid"
          }}
        >
          <FaUser
            sx={{
              alignSelf: "center",
              justifySelf: "center",
              color: "background"
            }}
            size={18}
          />
        </div>
        // </Frame>
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
        {player ? player.name || player.fullName : ""}
      </Styled.p>
    </button>
  )
}

export default Slot
