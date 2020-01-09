/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { AiTwotoneCrown } from "react-icons/ai"

const Heading = () => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "10% 49% 10% 10% 10% 10%",
        alignItems: "center",
        borderBottom: "solid 1px",
        borderBottomColor: "primary",
      }}
    >
      <div
        sx={{
          gridColumn: "span 2",
        }}
      >
        <Styled.h2 sx={{ my: 0 }}>Season 1 Leaderboard</Styled.h2>
      </div>

      <div sx={{ color: "gold", textAlign: "center" }}>
        <AiTwotoneCrown></AiTwotoneCrown>
      </div>
      <div sx={{ color: "silver", textAlign: "center" }}>
        <AiTwotoneCrown></AiTwotoneCrown>
      </div>
      <div sx={{ color: "#CD7F32", textAlign: "center" }}>
        <AiTwotoneCrown></AiTwotoneCrown>
      </div>

      <Styled.h2 sx={{ my: 0, textAlign: "center" }}>Score</Styled.h2>
    </div>
  )
}

export default Heading
