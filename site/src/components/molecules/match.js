/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import dayjs from "dayjs"
const Match = ({ match, dispatch, selected, disabled }) => {
  const time = dayjs(match.start).format("HH:mm")

  return (
    <button
      sx={{
        height: 45,
        width: "100%",
        cursor: "pointer",
        my: 1,
        py: 1,
        px: 2,
        appearance: "none",
        outline: "none",
        display: "flex",
        bg: "background",
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 5,
        border: disabled ? "none" : selected ? "solid 1px" : "none",
        // borderBottom: disabled ? "none" : selected ? "solid 3px" : "solid 1px",
        borderColor: selected ? "red" : "lightgrey",
        boxShadow: "0px 1px 4px darkgrey"
      }}
      disabled={disabled}
      onClick={dispatch}
    >
      <div sx={{ textAlign: "left" }}>
        <Styled.p
          sx={{
            fontFamily: "heading"
            // fontWeight: selected ? "heading" : "body"
          }}
        >
          {match.home.name || match.home.fullName}
        </Styled.p>
        <Styled.p sx={{}}>{match.away.name || match.away.fullName}</Styled.p>
      </div>
      <div sx={{ mx: "auto" }} />
      <div sx={{ textAlign: "right" }}>
        <Styled.p sx={{ textTransform: "capitalize" }}>
          {match.day.substr(0, 3)}
        </Styled.p>
        <Styled.p sx={{}}>{time}</Styled.p>
      </div>
    </button>
  )
}

export default Match
