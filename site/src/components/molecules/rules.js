/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Rules = ({ deadline }) => {
  return (
    <div sx={{ mx: 2, textAlign: "center" }}>
      <Styled.p
        sx={{
          mb: 2,
          mt: 0,
          // alignSelf: "end",
          // justifySelf: "start",
          textTransform: "capitalize",
          fontWeight: 500,
          textAlign: "center",
          fontSize: 2
        }}
      >
        Deadline {deadline}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "center",
          textTransform: "capitalize",
          fontWeight: 500,
          textAlign: "center",
          fontSize: 2
        }}
      >
        Rules
      </Styled.p>
    </div>
  )
}

export default Rules
