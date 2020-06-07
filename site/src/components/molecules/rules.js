/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Rules = ({ deadline }) => {
  return (
    <div sx={{ justifySelf: "start", mx: 3 }}>
      <Styled.h5
        sx={{
          m: 0,
          mb: 2,
          mt: 0,
          textTransform: "capitalize",
          color: "red",
          fontWeight: 500,
          // textAlign: "center",
          fontSize: [1, 2]
        }}
      >
        Deadline {deadline}
      </Styled.h5>
      <Styled.h5
        sx={{
          // alignSelf: "end",
          // justifySelf: "start",
          m: 0,
          mt: 3,
          textTransform: "capitalize",
          color: "red",
          fontWeight: 500,
          textAlign: "left",
          fontSize: [1, 2]
        }}
      >
        Rules >
      </Styled.h5>
    </div>
  )
}

export default Rules
