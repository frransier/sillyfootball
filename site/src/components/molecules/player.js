/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaRegCircle, FaCheckCircle } from "react-icons/fa"
import Rate from "./rate"

const Player = ({ player, dispatch, selected, disabled }) => (
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
    disabled={disabled}
  >
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "10% 62% 14% 14%",
        color: "text"
      }}
    >
      {!disabled && (
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
      )}

      <div
        sx={{
          display: "flex",
          gridColumn: disabled && "1 / span 2",
          alignSelf: "center",
          justifySelf: "start",
          alignItems: "center",
          mx: disabled && 4
        }}
      >
        <div sx={{ width: 48 }}>
          <Rate rate={player.rate} />
        </div>
        <Styled.p
          sx={{
            textAlign: "left",
            fontWeight: "heading",
            color: "text"
            // ml: player.rate !== 1 && 3
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
    </div>
  </button>
)

export default Player
