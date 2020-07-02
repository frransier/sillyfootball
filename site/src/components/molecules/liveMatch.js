/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import dayjs from "dayjs"
import { useState, Fragment } from "react"

const LiveMatch = ({ match, disabled, selected }) => {
  const [show, setShow] = useState(false)
  const started = dayjs() > dayjs(match.start)
  const time = dayjs(match.start).format("HH:mm")
  const day = dayjs(match.start)
    .format("dddd")
    .substr(0, 3)
  return (
    <div sx={{ my: 3, borderBottom: "solid 1px", borderBottomColor: "muted" }}>
      {/* <Frame borderWidth={0}> */}
      <button
        sx={{
          cursor: "pointer",
          border: "none",
          p: 1,
          appearance: "none",
          outline: "none",
          width: "100%",
          height: 30,
          bg: show ? "secondary" : "background",
          color: show ? "background" : "text"
        }}
        onClick={() => match.events.length > 0 && setShow(!show)}
      >
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["13% 31% 12% 31% 13%", "15% 28% 14% 28% 15%"],
            fontWeight: "heading"
          }}
        >
          <div
            sx={{
              width: 10,
              height: 10,
              borderRadius: 999,
              border: "solid 0.1px white",
              mx: 4,
              bg:
                match.status === "ft"
                  ? "red"
                  : match.status === "ns"
                  ? "muted"
                  : "primary",
              alignSelf: "center",
              justifySelf: "start"
            }}
          />
          <Styled.p sx={{ textAlign: "right" }}>
            {match.home.name || match.home.fullName}
          </Styled.p>
          <Styled.p sx={{ fontWeight: "heading" }}>
            {started
              ? `${match.homeGoals || 0} - ${match.awayGoals || 0}`
              : time}
          </Styled.p>
          <Styled.p sx={{ textAlign: "left" }}>
            {match.away.name || match.away.fullName}
          </Styled.p>

          <Styled.p
            sx={{
              fontWeight: 600,
              alignSelf: "center",
              justifySelf: "end",
              mx: [4, 3]
            }}
          >
            {match.status === "ft"
              ? ""
              : match.elapsed
              ? `${match.elapsed}'`
              : day}
          </Styled.p>
        </div>
      </button>
      {show && (
        <div
          sx={{
            p: 1,
            display: "grid",
            gridTemplateColumns: ["13% 31% 12% 31% 13%", "15% 28% 14% 28% 15%"],
            width: "100%"
          }}
        >
          <div sx={{ gridColumn: "1 / span 2" }}>
            {match.events
              .filter(x => x.team._id === match.home._id)
              .map((x, i) => (
                <Fragment key={i}>
                  <div
                    sx={{
                      my: 2,
                      display: "grid",
                      gridTemplateColumns: ["20% 80%", "35% 65%"]
                    }}
                    key={i}
                  >
                    <Styled.p sx={{ justifySelf: "start", ml: 4 }}>
                      {x.elapsed}'
                    </Styled.p>

                    <Styled.p
                      sx={{ fontWeight: "heading", textAlign: "right" }}
                    >
                      {x.detail === "Own Goal"
                        ? "(og)"
                        : x.detail === "Penalty"
                        ? "(pen)"
                        : null}{" "}
                      {x.goal}
                    </Styled.p>
                  </div>

                  <Styled.p sx={{ color: "darkgrey", textAlign: "right" }}>
                    {x.assist}
                  </Styled.p>
                </Fragment>
              ))}
          </div>

          <div sx={{}} />

          <div sx={{ gridColumn: "4 / span 2" }}>
            {match.events
              .filter(x => x.team._id === match.away._id)
              .map((x, i) => (
                <Fragment key={i}>
                  <div
                    sx={{
                      my: 2,
                      display: "grid",
                      gridTemplateColumns: ["80% 20%", "65% 35%"]
                    }}
                    key={i}
                  >
                    <Styled.p sx={{ fontWeight: "heading", textAlign: "left" }}>
                      {x.goal}{" "}
                      {x.detail === "Own Goal"
                        ? "(og)"
                        : x.detail === "Penalty"
                        ? "(pen)"
                        : null}
                    </Styled.p>
                    <Styled.p sx={{ justifySelf: "end", mx: 4 }}>
                      {x.elapsed}'
                    </Styled.p>
                  </div>

                  <Styled.p sx={{ color: "darkgrey", textAlign: "left" }}>
                    {x.assist}
                  </Styled.p>
                </Fragment>
              ))}
          </div>
        </div>
      )}
      {/* </Frame> */}
    </div>
  )
}

export default LiveMatch
