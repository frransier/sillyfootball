/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Heading = ({ main, sub1, sub2, sub3 }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "55% 15% 15% 15%"
      }}
    >
      <Styled.h3 sx={{ mb: 0, mt: 2 }}>{main}</Styled.h3>

      <Styled.p
        sx={{
          alignSelf: sub1 && !sub2 && !sub3 ? "center" : "end",
          mx: sub1 && !sub2 && !sub3 ? 2 : 0,
          justifySelf: sub1 && !sub2 && !sub3 ? "end" : "end",
          fontWeight: "heading",
          gridColumn: sub1 && !sub2 && !sub3 && "2 / span 3",
          textAlign: sub1 && !sub2 && !sub3 && "right",
          mb: 0,
          mt: 2
        }}
      >
        {sub1}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "end",
          fontWeight: "heading",
          mb: 0,
          mt: 2
        }}
      >
        {sub2}
      </Styled.p>
      <Styled.p
        sx={{
          alignSelf: "end",
          justifySelf: "end",
          fontWeight: "heading",
          mb: 0,
          mt: 2
        }}
      >
        {sub3}
      </Styled.p>
    </div>
  )
}

export default Heading
