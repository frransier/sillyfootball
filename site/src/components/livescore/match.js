/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import { GiSoccerBall } from "react-icons/gi"
import { IoIosReturnLeft, IoIosReturnRight } from "react-icons/io"
import { FaAngleDown, FaAngleRight, FaRegCalendarCheck } from "react-icons/fa"

const Match = ({ match }) => {
  const [selected, setSelected] = useState(false)
  const date = new Date(match.start)
  const minutes = date.getMinutes() === 0 ? "00" : `${date.getMinutes()}`
  const hours = `${date.getHours()}`

  return (
    <div>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 30% 20% 30% 10%",
          alignItems: "center",
          cursor: match.events && match.events.length > 0 ? "pointer" : null,
          fontFamily: "body",
          fontSize: 4,
          borderBottom: "solid 2px",
          borderBottomColor: "muted",
          fontWeight: "body",
          color: selected ? "background" : "text",
          bg: selected ? "primary" : "background",
          mb: 3,
          outline: "none",
        }}
        role="button"
        tabIndex="0"
        onClick={() =>
          match.events && match.events.length > 0 && setSelected(!selected)
        }
        onKeyDown={() => match.events && setSelected(!selected)}
      >
        <div
          sx={{
            py: 2,
            color: match.status !== "ns" ? "primary" : "muted",
            textAlign: "center",
          }}
        >
          {match.status && selected ? <FaAngleDown /> : <FaAngleRight />}
        </div>
        <div>
          <div sx={{ textAlign: "right", my: 3, fontSize: 3 }}>
            {match.home.team.name || match.home.team.fullName}
          </div>
        </div>
        <div
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: match.status !== "ns" ? 4 : 2,
          }}
        >
          {match.status !== "ns"
            ? `${match.home.goals || 0} - ${match.away.goals || 0}`
            : `${hours}:${minutes}`}
        </div>
        <div>
          <div sx={{ fontSize: 3 }}>
            {match.away.team.name || match.away.team.fullName}
          </div>
        </div>
        <div sx={{ textAlign: "center" }}>
          {match.status === "ft" ? (
            <FaRegCalendarCheck />
          ) : match.status === "ht" ? (
            match.status
          ) : match.elapsed ? (
            match.elapsed + `'`
          ) : (
            ``
          )}
        </div>
      </div>
      {selected &&
        match.events &&
        match.events.map((x, i) => {
          const home = x.team._ref === match.home.team.id
          return (
            <div key={i}>
              <div
                sx={{
                  display: "grid",
                  gridTemplateColumns: "10% 30% 20% 30% 10%",
                  alignItems: "center",

                  fontFamily: "body",
                  fontSize: 3,
                }}
              >
                <div sx={{ textAlign: "center", color: "primary" }}>
                  {home ? `${x.elapsed} '` : ""}
                </div>
                <div sx={{ textAlign: "right" }}>
                  {home ? `${x.player.name || x.player.fullName}` : ""}
                </div>
                <div
                  sx={{
                    textAlign: "center",
                    pt: 2,
                    fontSize: 4,
                    color: "text",
                  }}
                >
                  <GiSoccerBall />
                </div>
                <div sx={{ textAlign: "left" }}>
                  {home ? `` : `${x.player.name || x.player.fullName}`}
                </div>
                <div sx={{ textAlign: "center", color: "primary" }}>
                  {" "}
                  {home ? `` : `${x.elapsed} '`}
                </div>
              </div>
              <div
                sx={{
                  display: "grid",
                  gridTemplateColumns: "10% 30% 20% 30% 10%",
                  alignItems: "center",

                  fontFamily: "body",
                  fontSize: 3,
                  borderBottom: "solid 3px",
                  borderBottomColor:
                    i + 1 === match.events.length ? "primary" : "muted",
                }}
              >
                <div sx={{ textAlign: "center" }}>{""}</div>
                <div sx={{ textAlign: "right" }}>
                  {home
                    ? `${(x.assist && (x.assist.name || x.assist.fullName)) ||
                        "-"}`
                    : ""}
                </div>
                <div sx={{ textAlign: "center", fontSize: 5 }}>
                  {home ? <IoIosReturnLeft /> : <IoIosReturnRight />}
                </div>
                <div sx={{ textAlign: "left" }}>
                  {home
                    ? ``
                    : `${(x.assist && (x.assist.name || x.assist.fullName)) ||
                        "-"}`}
                </div>
                <div sx={{ textAlign: "center" }}> </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Match
