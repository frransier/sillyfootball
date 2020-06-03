/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import dayjs from "dayjs"
const Match = ({ match, dispatch, selected, disabled }) => {
  const time = dayjs(match.start).format("HH:mm")

  return (
    <div
      sx={{
        py: "2px",
        px: "3px",
        bg: disabled ? "background" : "secondary",
        // borderTopLeftRadius: 4,
        // height: 50,
        width: "100%",
        my: 1,
        ml: -1,
        display: "grid",
        boxShadow: "2px 2px 4px darkgrey"
        // transform: "rotate(0.5deg)"
        // transform: "rotate(1deg)"
      }}
    >
      <button
        sx={{
          alignSelf: "center",
          justifySelf: "center",

          // height: 45,
          width: "100%",
          cursor: "pointer",
          // my: 1,
          py: selected ? 1 : 1,
          px: 2,
          appearance: "none",
          outline: "none",
          display: "flex",
          alignItems: "center",
          bg: selected ? "secondary" : "background",
          color: disabled ? "darkgrey" : selected ? "background" : "secondary",

          // borderTopLeftRadius: 2,
          // borderBottomLeftRadius: 0,
          // borderTopRightRadius: 2,
          // borderTopLeftRadius: 5,
          border: "solid 1px",
          // borderBottom: disabled ? "none" : selected ? "solid 3px" : "solid 1px",
          borderColor: disabled
            ? "background"
            : selected
            ? "primary"
            : "primary"
          // boxShadow: "0px 1px 4px darkgrey"
        }}
        disabled={disabled}
        onClick={dispatch}
      >
        <div sx={{ textAlign: "left" }}>
          <Styled.p
            sx={{
              fontFamily: "body",
              fontWeight: 600
              // fontWeight: selected ? "heading" : "body"
            }}
          >
            {match.home.name || match.home.fullName}
          </Styled.p>
          <Styled.p sx={{ fontFamily: "body", fontWeight: 600 }}>
            {match.away.name || match.away.fullName}
          </Styled.p>
        </div>
        <div sx={{ mx: "auto" }} />
        <div sx={{ textAlign: "right" }}>
          <Styled.p sx={{ textTransform: "capitalize" }}>
            {match.day.substr(0, 3)}
          </Styled.p>
          <Styled.p sx={{}}>{time}</Styled.p>
        </div>
      </button>
    </div>
  )
}

export default Match
