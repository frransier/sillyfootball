/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Rules = ({ deadline, dispatch }) => {
  return (
    <div sx={{ mx: 3, display: "flex" }}>
      <Styled.h5
        sx={{
          mt: 0,
          textTransform: "capitalize",
          // color: "red",
          fontWeight: 500
          // textAlign: "center",
          // fontSize: [1, 2]
        }}
      >
        Deadline {deadline}
      </Styled.h5>
      <div sx={{ mx: "auto" }} />
      <Styled.h5
        sx={{
          // alignSelf: "end",
          // justifySelf: "start",
          mt: 0,
          textTransform: "capitalize",
          color: "red",
          fontWeight: 500,
          textAlign: "left",
          cursor: "pointer"
        }}
        onClick={dispatch}
      >
        Rules >
      </Styled.h5>
    </div>
  )
}

export default Rules
