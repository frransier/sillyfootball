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
    <Fragment>
      <button
        sx={{
          cursor: "pointer",
          my: 1,
          p: 1,
          appearance: "none",
          outline: "none",
          width: "100%",
          height: 30,
          bg: "background",
          borderRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 2,
          borderTopLeftRadius: 5,
          border: disabled ? "none" : show ? "solid 1px" : "none",
          borderBottom: disabled ? "none" : show ? "solid 3px" : "solid 1px",
          borderColor: show ? "red" : "lightgrey"
        }}
        onClick={() => match.events.length > 0 && setShow(!show)}
      >
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["7% 37% 12% 37% 7%", "18% 28% 14% 28% 12%"],
            fontWeight: "heading"
          }}
        >
          <Styled.p sx={{}}>
            {match.elapsed ? `${match.elapsed}'` : day}
          </Styled.p>
          <Styled.p sx={{ textAlign: "right", mr: 1, ml: 2 }}>
            {match.home.name || match.home.fullName}
          </Styled.p>
          <Styled.p sx={{}}>
            {started
              ? `${match.homeGoals || 0} - ${match.awayGoals || 0}`
              : time}
          </Styled.p>
          <Styled.p sx={{ textAlign: "left", mr: 2, ml: 1 }}>
            {match.away.name || match.away.fullName}
          </Styled.p>
          <div
            sx={{
              width: 10,
              height: 10,
              borderRadius: 999,
              border: "solid 0.1px white",
              mx: 0,
              bg:
                match.status === "ft"
                  ? "red"
                  : match.status === "ns"
                  ? "lightgrey"
                  : "lime",
              alignSelf: "center",
              justifySelf: ["start", "center"]
              // boxShadow: "1px 1px 0px black"
            }}
          />
        </div>
      </button>
      {show && (
        <div
          sx={{
            mx: 1,
            p: 1,
            display: "grid",
            gridTemplateColumns: "44% 12% 44%",
            width: "100%"
          }}
        >
          <div sx={{ textAlign: "right", mr: 2, ml: 0 }}>
            {match.events
              .filter(x => x.team._id === match.home._id)
              .map((x, i) => (
                <div key={i} sx={{ my: 0 }}>
                  <div sx={{ display: "flex" }}>
                    <Styled.p sx={{ mr: 0 }}>{x.elapsed}' </Styled.p>
                    <div sx={{ mx: "auto" }} />
                    <Styled.p>{x.goal.fullName}</Styled.p>
                  </div>
                  <Styled.p sx={{ color: "darkgrey" }}>
                    {x.assist.fullName}
                  </Styled.p>
                </div>
              ))}
          </div>
          <div sx={{}} />
          <div
            sx={{
              textAlign: "left",
              mr: 2,
              ml: 0
            }}
          >
            {match.events
              .filter(x => x.team._id === match.away._id)
              .map((x, i) => (
                <div key={i} sx={{ my: 0 }}>
                  <div sx={{ display: "flex" }}>
                    <Styled.p>{x.goal.fullName}</Styled.p>
                    <div sx={{ mx: "auto" }} />
                    <Styled.p sx={{ mr: 0 }}>{x.elapsed}' </Styled.p>
                  </div>
                  <Styled.p sx={{ color: "darkgrey" }}>
                    {x.assist.fullName}
                  </Styled.p>
                </div>
              ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default LiveMatch
