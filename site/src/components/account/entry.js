/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { AiTwotoneCrown, AiOutlineMeh } from "react-icons/ai"

const Entry = ({ entry, scores }) => {
  console.log(entry.season[0].bronze)

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
        }}
      >
        <div sx={{ textAlign: "center", pt: 3, fontSize: 5 }}>
          {entry.season[0].points === scores[0] ? (
            <div sx={{ color: "gold" }}>
              <AiTwotoneCrown />
            </div>
          ) : entry.season[0].points === scores[1] ? (
            <div sx={{ color: "silver" }}>
              <AiTwotoneCrown />
            </div>
          ) : entry.season[0].points === scores[2] ? (
            <div sx={{ color: "#CD7F32" }}>
              <AiTwotoneCrown />
            </div>
          ) : (
            <AiOutlineMeh />
          )}
        </div>

        <Styled.h3
          sx={{
            textAlign: "left",
            mx: 4,
            my: 0,
            pt: 3,
            fontSize: 4,
            fontWeight: "body",
          }}
        >
          {entry.name}
        </Styled.h3>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {entry.season[0].gold}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {entry.season[0].silver}
        </Styled.p>
        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {entry.season[0].bronze}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, pt: 2, fontSize: 4 }}>
          {entry.season[0].points}p
        </Styled.h3>
      </div>
    </div>
  )
}

export default Entry
