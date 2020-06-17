/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Container from "../atoms/container"

const User = ({ user, index }) => {
  return (
    <Container mt={3} columns={["58.8% 13% 13% 13%", "53.8% 15% 15% 15%"]}>
      <Styled.p
        sx={{
          textAlign: "left",
          // fontWeight: 500,
          my: 1,
          ml: [0, 2],
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
          justifySelf: "end",
          mx: 3
          // fontWeight: "heading"
        }}
      >
        {user.high.toFixed(1) || 0}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "center",
          justifySelf: "end",
          mx: -2
          // fontWeight: "heading",
        }}
      >
        {user.average.toFixed(2) || 0}
      </Styled.p>
    </Container>
  )
}

export default User
