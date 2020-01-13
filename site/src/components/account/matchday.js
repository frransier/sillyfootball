/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"

import { AiTwotoneCrown, AiOutlineMeh } from "react-icons/ai"
import { FaStar, FaAngleDown, FaAngleRight } from "react-icons/fa"
import { useUserState } from "../../state"

const Matchday = ({ matchday, id, index, gold, silver, bronze, current }) => {
  const userState = useUserState()
  const [show, setShow] = useState(false)
  const scores = matchday.players
    .map(p => {
      const pt = (p.scores && p.scores.find(q => q.matchday._ref === id)) || []
      const player = p._id
      if (pt.length !== 0) return { scores: pt, player: player }
      return null
    })
    .filter(Boolean)

  const points = scores.map(x => x.scores.points).reduce((a, b) => a + b, 0)

  return (
    <div
      sx={{
        borderBottom: show ? "solid 1px" : "solid 2px",
        borderBottomColor: show ? "primary" : "muted",
      }}
    >
      <Styled.h2>{current ? "Denna omgången" : `Omgång ${index}`}</Styled.h2>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          alignItems: "center",
        }}
      >
        <div sx={{ textAlign: "center", fontSize: 6 }}>
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
          <div
            sx={{
              textAlign: "left",
              fontSize: 5,
              display: "flex",
              alignItems: "center",
              color: "text",
            }}
          >
            <Styled.h2
              sx={{
                fontWeight: show ? "heading" : "body",
              }}
            >
              {userState.name}
            </Styled.h2>
            {show ? <FaAngleDown /> : <FaAngleRight />}
          </div>
        </button>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show ? "Mål" : ""}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show && "Ass"}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, fontSize: 4 }}>
          {points}p
        </Styled.h3>
      </div>
      {show &&
        matchday.players.map((x, i) => {
          const points = scores
            .map(y => {
              if (y.player === x._id) {
                const goals = y.scores.goals
                const assists = y.scores.assists
                const points = { goals: goals, assists: assists }
                return points
              }
              return null
            })
            .filter(Boolean)
          return (
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
                {points[0] && (points[0].goals || points[0].assists) ? (
                  <FaStar />
                ) : (
                  ""
                )}
              </div>
              <Styled.p sx={{ textAlign: "left", mx: 4, my: 0 }}>
                {x.name || x.fullName}
              </Styled.p>
              <Styled.p sx={{ textAlign: "center", my: 0 }}>
                {(points[0] && points[0].goals) || ""}
              </Styled.p>
              <Styled.p sx={{ textAlign: "center", my: 0 }}>
                {(points[0] && points[0].assists) || ""}
              </Styled.p>
              <div></div>
            </div>
          )
        })}
    </div>
  )
}

export default Matchday
