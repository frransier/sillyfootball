/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Heading = ({ main, sub1, sub2, sub3, columns, justify }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: columns
      }}
    >
      <Styled.h1 sx={{ mb: 0, mt: 2 }}>{main}</Styled.h1>

      {sub1 && (
        <Styled.p
          sx={{
            alignSelf: "end",
            mx: 0,
            justifySelf: justify || "end",
            fontWeight: "heading",
            mb: 0,
            mt: 2
          }}
        >
          {sub1}
        </Styled.p>
      )}
      {sub2 && (
        <Styled.p
          sx={{
            alignSelf: "end",
            justifySelf: justify || "end",
            fontWeight: "heading",
            mb: 0,
            mt: 2
          }}
        >
          {sub2}
        </Styled.p>
      )}
      {sub3 && (
        <Styled.p
          sx={{
            alignSelf: "end",
            justifySelf: justify || "end",
            fontWeight: "heading",
            mb: 0,
            mt: 2
          }}
        >
          {sub3}
        </Styled.p>
      )}
    </div>
  )
}

export default Heading
