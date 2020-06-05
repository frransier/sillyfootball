/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Container from "../atoms/container"

const User = ({ user, index }) => {
  return (
    <Container mt={3} columns={["54% 17% 17% 12%", "54% 15% 15% 16%"]}>
      <Styled.p
        sx={{
          textAlign: "left",
          fontWeight: 500,
          my: 1,
          fontSize: 2
        }}
      >
        {index}. {user.name}
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
          justifySelf: "center"
          // fontWeight: "heading",
        }}
      >
        {user.average.toFixed(2) || 0}
      </Styled.p>
    </Container>
  )
}

export default User
