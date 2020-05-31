/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { FaStar } from "react-icons/fa"

const Score = ({ player }) => {
  // console.log(player)
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "55% 15% 15% 15%",
        justifyItems: "center",
        my: 2,
        borderBottom: "solid 1px",
        borderBottomColor: "#E8E8E8"
      }}
    >
      <div sx={{ ml: 2, justifySelf: "start", display: "flex" }}>
        <Styled.p sx={{}}>{player.name || player.fullName}</Styled.p>
        <Styled.p sx={{ mx: 2, color: "darkgrey", fontSize: "10px" }}>
          {player.teamName || player.teamFullName}
        </Styled.p>
        <Styled.p>{player.rate === 1 && <FaStar />}</Styled.p>
      </div>
      <Styled.p sx={{ alignSelf: "center", mx: 1, justifySelf: "end" }}>
        {player.goals}
      </Styled.p>
      <Styled.p sx={{ alignSelf: "center", mx: 1, justifySelf: "end" }}>
        {player.assists}
      </Styled.p>
      <Styled.p sx={{ alignSelf: "center", justifySelf: "end", mx: "9px" }}>
        {player.points}
      </Styled.p>
    </div>
  )
}

export default Score
