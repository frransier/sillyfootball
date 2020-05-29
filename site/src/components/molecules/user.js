/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const User = ({ user }) => {
  return (
    <div sx={{ display: "grid", gridTemplateColumns: "40% 22% 22% 16%" }}>
      <Styled.p
        sx={{
          textAlign: "left",
          fontWeight: 700,
          m: 1,
          fontSize: 2
        }}
      >
        {user.name}
      </Styled.p>

      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "center"
          // fontWeight: "heading"
        }}
      >
        {user.wins || 0}
      </Styled.p>
      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "center"
          // fontWeight: "heading"
        }}
      >
        {user.high.toFixed(1) || 0}
      </Styled.p>
      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "end",
          fontWeight: "heading",
          mx: 1
        }}
      >
        {user.average.toFixed(2) || 0}
      </Styled.p>
    </div>
  )
}

export default User
