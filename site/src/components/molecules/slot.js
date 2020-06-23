/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { FaStar } from "react-icons/fa"
import Rate from "./rate"

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
        height: 80,
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
          <div
            sx={{
              bg: "secondary",
              mt: 4,
              width: 50,
              height: 50,
              boxShadow: "2px 2px 4px darkgrey",
              alignSelf: "end",
              justifySelf: "center",
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              borderRadius: 999,
              color: player ? "background" : "primary"
            }}
          >
            <FaStar sx={{ color: "background" }} size={13} />
          </div>
        )}
        <Styled.p
          sx={{
            fontSize: 1,
            fontWeight: 600,
            width: "100%",
            my: 3,
            alignSelf: "start",
            color: player ? "background" : "secondary"
          }}
        >
          {player ? player.name || player.fullName : null}
        </Styled.p>
        {player && (
          <div sx={{ ml: 3, mb: 4 }}>
            <Rate rate={player.rate} />
          </div>
        )}
      </div>
    </button>
  )
}

export default Slot
