/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaRegCircle, FaCheckCircle, FaStar } from "react-icons/fa"

const Player = ({ player, dispatch, selected }) => (
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
      my: 3,
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
          justifySelf: "center",
          borderRadius: 999,
          height: 20
        }}
      >
        {selected ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
      </div>

      <div
        sx={{
          display: "flex",

          alignSelf: "center",
          justifySelf: "start",
          alignItems: "center"
        }}
      >
        {player.rate === 1 && <FaStar sx={{ mr: 3, color: "red" }} size={12} />}
        <Styled.p
          sx={{
            textAlign: "left",
            fontWeight: "heading",
            color: "text",
            ml: player.rate !== 1 && 3
          }}
        >
          {player.name || player.fullName}
        </Styled.p>
        <Styled.p sx={{ ml: 4, color: "darkgrey" }}>
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
)

export default Player
