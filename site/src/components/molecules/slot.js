/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaUser } from "react-icons/fa"
import Image from "gatsby-image"

const Slot = ({ player, dispatch }) => {
  return (
    <button
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
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
      {player && (
        <Image sx={{ mt: 1, mb: 0 }} fixed={player.team.logo.asset.fixed} />
      )}
      <Styled.p
        sx={{
          fontSize: 1,
          fontWeight: 600,
          width: "100%",
          my: 1,
          alignSelf: "center",
          color: player ? "background" : "secondary"
        }}
      >
        {player ? player.name || player.fullName : <FaUser size={18} />}
      </Styled.p>
      {/* </div> */}
    </button>
  )
}

export default Slot
