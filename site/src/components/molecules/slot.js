/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaUser } from "react-icons/fa"
import Image from "gatsby-image"

const Slot = ({ player, dispatch }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        p: 0,
        width: "100%",
        height: 60,
        appearance: "none",
        outline: "none",
        bg: "background",
        border: "none",
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: player ? "solid 3px" : "none",
        borderBottomColor: "red"
      }}
      onClick={dispatch}
    >
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {player && (
          <Image sx={{ mt: 1, mb: 0 }} fixed={player.team.logo.asset.fixed} />
        )}
        <Styled.h6
          sx={{ fontSize: 1, width: "100%", my: 1, alignSelf: "center" }}
        >
          {player ? player.name || player.fullName : <FaUser size={20} />}
        </Styled.h6>
      </div>
    </button>
  )
}

export default Slot
