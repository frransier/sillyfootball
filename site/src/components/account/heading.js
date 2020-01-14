/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import gold from "../../images/gold.svg"
import silver from "../../images/silver.svg"
import bronze from "../../images/bronze.svg"

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

      <img sx={{ width: "40%", mx: "auto" }} src={gold} alt="Gold" />
      <img sx={{ width: "40%", mx: "auto" }} src={silver} alt="Silver" />
      <img sx={{ width: "40%", mx: "auto" }} src={bronze} alt="Bronze" />

      <Styled.h2 sx={{ my: 0, textAlign: "center" }}>Score</Styled.h2>
    </div>
  )
}

export default Heading
