/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"

import { AiTwotoneCrown, AiOutlineMeh } from "react-icons/ai"
import { FaStar } from "react-icons/fa"
import { useUserState } from "../../state"

const Matchday = ({ matchday, id, index, gold, silver, bronze }) => {
  console.log(gold)

  const userState = useUserState()
  const [show, setShow] = useState(false)
  const scores = matchday.players.map(p => {
    const pt = p.scores.find(q => q.matchday._ref === id) || []
    return pt
  })
  const points = scores.map(x => x.points).reduce((a, b) => a + b, 0)

  return (
    <div
      sx={{
        borderBottom: show ? "solid 1px" : "solid 2px",
        borderBottomColor: show ? "primary" : "muted",
      }}
    >
      <Styled.h2>Omgång {index}</Styled.h2>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          alignItems: "center",
        }}
      >
        <div sx={{ textAlign: "center", pt: 3, fontSize: 5 }}>
          {points === gold ? (
            <div sx={{ color: "gold" }}>
              <AiTwotoneCrown />
            </div>
          ) : points === silver ? (
            <div sx={{ color: "silver" }}>
              <AiTwotoneCrown />
            </div>
          ) : points === bronze ? (
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
            {userState.name}
          </Styled.h3>
        </button>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show ? "Mål" : ""}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show && "Ass"}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, pt: 2, fontSize: 4 }}>
          {points}p
        </Styled.h3>
      </div>
      {show &&
        matchday.players.map((x, i) => (
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
              {scores[i] && (scores[i].goals || scores[i].assists) ? (
                <FaStar />
              ) : (
                ""
              )}
            </div>
            <Styled.p sx={{ textAlign: "left", mx: 4, my: 0 }}>
              {x.name || x.fullName}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(scores[i] && scores[i].goals) || ""}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(scores[i] && scores[i].assists) || ""}
            </Styled.p>
            <div></div>
          </div>
        ))}
    </div>
  )
}

export default Matchday
