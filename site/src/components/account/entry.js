/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { AiOutlineMeh } from "react-icons/ai"
import gold from "../../images/gold.svg"
import silver from "../../images/silver.svg"
import bronze from "../../images/bronze.svg"

const Entry = ({ entry, scores }) => {
  return (
    <div
      sx={{
        borderBottom: "solid 2px",
        borderBottomColor: "muted",
      }}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 49% 10% 10% 10% 10%",
          alignItems: "center",
          py: 3,
        }}
      >
        <div sx={{ textAlign: "center", fontSize: 5 }}>
          {entry.season[0].points === scores[0] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={gold} alt="Gold" />
          ) : entry.season[0].points === scores[1] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={silver} alt="Silver" />
          ) : entry.season[0].points === scores[2] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={bronze} alt="Bronze" />
          ) : (
            <AiOutlineMeh />
          )}
        </div>

        <Styled.h3
          sx={{
            textAlign: "left",
            mx: 4,
            my: 0,
            fontSize: 5,
            fontWeight: "heading",
          }}
        >
          {entry.name}
        </Styled.h3>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 4 }}>
          {entry.season[0].gold}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 4 }}>
          {entry.season[0].silver}
        </Styled.p>
        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {entry.season[0].bronze}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, fontSize: 5 }}>
          {entry.season[0].points}p
        </Styled.h3>
      </div>
    </div>
  )
}

export default Entry
