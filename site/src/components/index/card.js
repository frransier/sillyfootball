/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Button from "../button"

const Card = ({ icon, title, body1, body2, cta, action }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "100%",
        justifyItems: "center",
        alignItems: "center",
        mx: [8, 8],
        my: 7,
        borderRadius: 2,
      }}
    >
      <div sx={{ fontSize: 7, pt: 6, textAlign: "center", color: "darkgrey" }}>
        {icon}
      </div>
      <Styled.h2
        sx={{
          textAlign: "center",
          my: 1,
          fontSize: 4,
        }}
      >
        {title}
      </Styled.h2>
      <div sx={{ fontSize: 2, minHeight: [10], mt: 4, textAlign: "center" }}>
        <Styled.p sx={{ my: 1 }}>{body1}</Styled.p>
      </div>
      <div sx={{ fontSize: 2, minHeight: [10], textAlign: "center" }}>
        <Styled.p sx={{ my: 1 }}>{body2}</Styled.p>
      </div>
      <Button text={cta} action={action} />
    </div>
  )
}

export default Card
