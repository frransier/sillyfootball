/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const User = ({ user }) => {
  return (
    <div sx={{ display: "grid", gridTemplateColumns: "40% 21% 21% 18%" }}>
      <Styled.p
        sx={{
          textAlign: "left",
          fontWeight: 700,
          mx: 2,
          my: 1,
          fontSize: 2
        }}
      >
        {user.name}
      </Styled.p>

      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: "center"
          // fontWeight: "heading"
        }}
      >
        {user.wins || 0}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: "center"
          // fontWeight: "heading"
        }}
      >
        {user.high.toFixed(1) || 0}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: "center",
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
