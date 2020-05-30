/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const PlayersHeading = ({ main, sub1, sub2, sub3 }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "14% 58% 14% 14%"
      }}
    >
      <Styled.h1
        sx={{
          mb: 1,
          mt: 2,
          gridColumn: "1 / span 2",
          alignSelf: "start",
          justifySelf: "start"
          // color: "red"
        }}
      >
        {main}
      </Styled.h1>

      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "center",
          fontWeight: "heading"
        }}
      >
        {sub1}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "center",
          fontWeight: "heading"
        }}
      >
        {sub2}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "center",
          fontWeight: "heading"
        }}
      >
        {sub3}
      </Styled.p>
    </div>
  )
}

export default PlayersHeading
