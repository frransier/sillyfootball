/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import dayjs from "dayjs"
const Match = ({ match, dispatch, selected, disabled }) => {
  const time = dayjs(match.start).format("HH:mm")

  return (
    <div
      sx={{
        width: "100%",
        my: 3,
        ml: -3,
        // boxShadow: "0px 2px 3px darkgrey"
        borderBottom: "solid 1px",
        borderBottomColor: "muted"
      }}
    >
      <button
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          bg: selected ? "secondary" : "background",
          height: 40,
          color: disabled ? "darkgrey" : selected ? "background" : "secondary",
          width: "100%",
          cursor: "pointer",
          appearance: "none",
          outline: "none",
          border: "none",
          display: "flex",
          alignItems: "center"
        }}
        disabled={disabled}
        onClick={dispatch}
      >
        <div sx={{ textAlign: "left" }}>
          <Styled.p
            sx={{
              fontFamily: "body",
              fontWeight: 500
            }}
          >
            {match.home.name || match.home.fullName}
          </Styled.p>
          <Styled.p sx={{ fontFamily: "body", fontWeight: 500 }}>
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
    </div> // <Frame my={3} ml={-3} borderWidth={0} width="100%">
    // </Frame>
  )
}

export default Match
