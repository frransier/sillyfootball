/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Heading = ({ main, sub1, sub2, sub3, columns, justify }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: columns,
        mx: 4
      }}
    >
      <Styled.h3 sx={{ mb: 0, mt: 2 }}>{main}</Styled.h3>

      {sub1 && typeof sub1 !== "string" ? (
        <div
          sx={{
            alignSelf: "end",
            mx: 0,
            justifySelf: justify || "end",
            fontWeight: 500,
            mb: 0,
            mt: 2
          }}
        >
          {sub1}
        </div>
      ) : (
        <Styled.p
          sx={{
            alignSelf: "end",
            mx: 0,
            justifySelf: "end",
            mx: 3,
            fontWeight: 500,
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
            justifySelf: "end",
            // mx: 4,
            fontWeight: 500,
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
            justifySelf: "end",
            // mx: 4,
            fontWeight: 500,
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
