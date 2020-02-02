/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import gold from "../../images/gold.svg"
import silver from "../../images/silver.svg"
import bronze from "../../images/bronze.svg"

const Heading = ({ currentSeason }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "10% 49% 10% 10% 10% 10%",
        alignItems: "center",
      }}
    >
      <div
        sx={{
          gridColumn: "span 2",
        }}
      >
        <Styled.h2 sx={{ my: 0 }}>Säsong {currentSeason}</Styled.h2>
      </div>

      <div
        sx={{
          borderBottom: "solid 1px",
          borderBottomColor: "primary",
          textAlign: "center",
        }}
      >
        <img sx={{ width: "40%", mx: "auto" }} src={gold} alt="Gold" />
      </div>
      <div
        sx={{
          borderBottom: "solid 1px",
          borderBottomColor: "primary",
          textAlign: "center",
        }}
      >
        <img sx={{ width: "40%", mx: "auto" }} src={silver} alt="Silver" />
      </div>
      <div
        sx={{
          borderBottom: "solid 1px",
          borderBottomColor: "primary",
          textAlign: "center",
        }}
      >
        <img sx={{ width: "40%", mx: "auto" }} src={bronze} alt="Bronze" />
      </div>

      <div
        sx={{
          borderBottom: "solid 1px",
          borderBottomColor: "primary",
          textAlign: "center",
        }}
      >
        <Styled.h2 sx={{ my: 0, textAlign: "center" }}>Score</Styled.h2>
      </div>
    </div>
  )
}

export default Heading
