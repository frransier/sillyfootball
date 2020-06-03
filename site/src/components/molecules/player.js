/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Fragment } from "react"
import { FaRegCircle, FaCheckCircle, FaStar } from "react-icons/fa"

const Player = ({ player, dispatch, selected }) => (
  <Fragment>
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        border: "none",
        width: "100%",
        bg: "background",
        p: 0,
        m: 0,
        py: 2
      }}
      onClick={dispatch}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 62% 14% 14%",
          color: "text"
        }}
      >
        <div
          sx={{
            color: selected ? "secondary" : "lightgrey",
            alignSelf: "center",
            justifySelf: "start",
            borderRadius: 999,
            mx: 2,
            bg: selected ? "primary" : "background",
            border: "none"
          }}
        >
          {selected ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
        </div>

        <div
          sx={{
            display: "flex",
            ml: 2,
            alignSelf: "center",
            justifySelf: "start"
          }}
        >
          {player.rate === 1 && <FaStar sx={{ mr: 1, color: "text" }} />}
          <Styled.p
            sx={{ textAlign: "left", fontWeight: "heading", color: "text" }}
          >
            {player.name || player.fullName}
          </Styled.p>
          <Styled.p sx={{ mx: 2, color: "darkgrey" }}>
            {player.team.name || player.team.fullName}
          </Styled.p>
        </div>

        <Styled.p sx={{ alignSelf: "center", justifySelf: "center" }}>
          {player.goals}
        </Styled.p>
        <Styled.p sx={{ alignSelf: "center", justifySelf: "center" }}>
          {player.assists}
        </Styled.p>
        {/* <Image sx={{ my: 2 }} fixed={player.team.logo.asset.fixed} /> */}
      </div>
    </button>
  </Fragment>
)

export default Player
