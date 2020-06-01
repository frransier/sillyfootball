/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Rules = ({ deadline }) => {
  return (
    <div sx={{ mx: 2 }}>
      <Styled.p
        sx={{
          mb: 2,
          mt: 0,
          alignSelf: "end",
          justifySelf: "start",
          textTransform: "capitalize",
          fontWeight: "display"
        }}
      >
        Deadline {deadline}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "start",
          textTransform: "capitalize",
          fontWeight: "display",
          fontSize: 2
        }}
      >
        Rules
      </Styled.p>
    </div>
  )
}

export default Rules
