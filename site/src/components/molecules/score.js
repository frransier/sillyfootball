/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaStar } from "react-icons/fa"
import Rate from "../molecules/rate"

const Score = ({ player }) => {
  console.log(player.rate)
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: ["61% 13% 13% 13%", "55% 15% 15% 15%"],
        justifyItems: "center",
        my: 3,
        borderBottom: "solid 1px",
        borderBottomColor: "#E8E8E8"
      }}
    >
      <div
        sx={{
          ml: [2, 4],
          justifySelf: "start",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Styled.p sx={{}}>{player.name || player.fullName}</Styled.p>
        <Styled.p sx={{ mx: 4, color: "darkgrey", fontSize: "9px" }}>
          {player.teamName || player.teamFullName}
        </Styled.p>
        <div sx={{ mb: 2 }}>
          <Rate rate={player.rate} color="text" size={10} />
        </div>
      </div>
      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: ["center", "end"],
          mx: [0, 5],
          ml: [3, 0]
        }}
      >
        {player.goals}
      </Styled.p>
      <Styled.p
        sx={{ alignSelf: "center", justifySelf: ["center", "end"], mx: [0, 5] }}
      >
        {player.assists}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: ["center", "end"],
          mx: [0, 4],
          ml: [4, 0]
        }}
      >
        {player.points.toFixed(1)}
      </Styled.p>
    </div>
  )
}

export default Score
