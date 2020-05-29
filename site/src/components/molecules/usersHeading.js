/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const UsersHeading = () => {
  return (
    <div sx={{ display: "grid", gridTemplateColumns: "40% 22% 22% 16%" }}>
      <Styled.p></Styled.p>
      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "center"
        }}
      >
        Wins
      </Styled.p>
      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "center"
        }}
      >
        High
      </Styled.p>
      <Styled.p
        sx={{
          textAlign: "right",
          alignSelf: "center",
          justifySelf: "end"
        }}
      >
        Average
      </Styled.p>
    </div>
  )
}

export default UsersHeading
