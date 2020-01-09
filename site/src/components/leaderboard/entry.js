/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"

import { AiTwotoneCrown, AiOutlineMeh } from "react-icons/ai"
import { FaStar } from "react-icons/fa"

const Entry = ({ x, scores }) => {
  const [show, setShow] = useState(false)

  return (
    <div
      sx={{
        borderBottom: show ? "solid 1px" : "solid 2px",
        borderBottomColor: show ? "primary" : "muted",
      }}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          alignItems: "center",
        }}
      >
        <div sx={{ textAlign: "center", pt: 3, fontSize: 5 }}>
          {x.points === scores[0] ? (
            <div sx={{ color: "gold" }}>
              <AiTwotoneCrown />
            </div>
          ) : x.points === scores[1] ? (
            <div sx={{ color: "silver" }}>
              <AiTwotoneCrown />
            </div>
          ) : x.points === scores[2] ? (
            <div sx={{ color: "#CD7F32" }}>
              <AiTwotoneCrown />
            </div>
          ) : (
            <AiOutlineMeh />
          )}
        </div>

        <button
          sx={{
            border: "none",
            appearance: "none",
            bg: "background",
            cursor: "pointer",
          }}
          onClick={() => setShow(!show)}
        >
          <Styled.h3
            sx={{
              textAlign: "left",
              mx: 4,
              my: 0,
              pt: 3,
              fontSize: 4,
              fontWeight: show ? "heading" : "body",
            }}
          >
            {x.user.name}
          </Styled.h3>
        </button>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show ? "Mål" : ""}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show && "Ass"}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, pt: 2, fontSize: 4 }}>
          {x.points}p
        </Styled.h3>
      </div>
      {show &&
        x.players.map((x, i) => (
          <div
            key={i}
            sx={{
              display: "grid",
              ml: 6,
              gridTemplateColumns: "10% 59% 10% 10% 10%",
              borderBottom: "solid 3px",
              borderBottomColor: "muted",
            }}
          >
            <div
              sx={{
                textAlign: "center",
                fontSize: 2,
                my: 3,
                color: "primary",
              }}
            >
              {x.score && (x.score.goals || x.score.assists) ? <FaStar /> : ""}
            </div>
            <Styled.p sx={{ textAlign: "left", mx: 4, my: 0 }}>
              {x.name}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(x.score && x.score.goals) || ""}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(x.score && x.score.assists) || ""}
            </Styled.p>
            <div></div>
          </div>
        ))}
    </div>
  )
}

export default Entry
