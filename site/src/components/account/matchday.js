/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import { AiOutlineMeh } from "react-icons/ai"
import { FaStar, FaAngleDown, FaAngleRight } from "react-icons/fa"
import { IoIosRefresh } from "react-icons/io"
import { useUserState } from "../../state"
import goldLogo from "../../images/gold.svg"
import silverLogo from "../../images/silver.svg"
import bronzeLogo from "../../images/bronze.svg"
import { navigate } from "gatsby"

const Matchday = ({
  matchday,
  id,
  index,
  title,
  gold,
  silver,
  bronze,
  current,
  refresh,
  status,
  start,
}) => {
  const userState = useUserState()
  const [show, setShow] = useState(current ? true : false)
  const now = new Date()
  const startt = new Date(start)

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
      <div sx={{ display: "flex", alignItems: "center" }}>
        <Styled.h2>
          {current ? "Aktuell omgång" : `Omgång ${index} | Säsong ${title}`}
        </Styled.h2>

        {status === "current" && now < startt && (
          <button
            sx={{
              appearance: "none",
              border: "none",
              bg: "primary",
              color: "background",
              py: 3,
              px: 5,
              mx: 6,
              borderRadius: 2,
              fontSize: 3,
              fontFamily: "heading",
              outline: "none",
              ":active, :after": {
                color: "primary",
                bg: "background",
              },
            }}
            onClick={() => navigate("/delete/")}
          >
            Ta bort
          </button>
        )}
        <div sx={{ mx: "auto" }} />
        <div sx={{ mx: 3 }}>
          {refresh && (
            <button
              sx={{
                appearance: "none",
                border: "none",
                bg: "primary",
                borderRadius: 2,
                color: "background",
                pt: 2,
                outline: "none",
                ":active, :after": {
                  color: "primary",
                  bg: "background",
                },
              }}
              onClick={refresh}
            >
              <IoIosRefresh size={20} />
            </button>
          )}
        </div>
      </div>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          alignItems: "center",
        }}
      >
        <div sx={{ textAlign: "center", fontSize: 6, mb: 4 }}>
          {points === gold ? (
            <img sx={{ width: "50%", mx: "auto" }} src={goldLogo} alt="Gold" />
          ) : points === silver ? (
            <img
              sx={{ width: "50%", mx: "auto" }}
              src={silverLogo}
              alt="Silver"
            />
          ) : points === bronze ? (
            <img
              sx={{ width: "50%", mx: "auto" }}
              src={bronzeLogo}
              alt="Bronze"
            />
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
            outline: "none",
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
