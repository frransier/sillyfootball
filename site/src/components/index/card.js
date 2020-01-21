/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Button from "../button"

const Card = ({ icon, title, body1, body2, cta, action }) => {
  return (
    <div
      sx={{
        minWidth: [175, 225],
        mx: [4, 6],
        my: 5,
        borderRadius: 2,
      }}
    >
      <div sx={{ fontSize: 7, pt: 6, textAlign: "center", color: "darkgrey" }}>
        {icon}
      </div>
      <Styled.p
        sx={{
          textAlign: "center",
          my: 1,
          fontSize: 4,
          fontWeight: "heading",
        }}
      >
        {title}
      </Styled.p>
      <div sx={{ fontSize: 2, minHeight: [10], mt: 4, textAlign: "center" }}>
        <Styled.p sx={{ my: 1 }}>{body1}</Styled.p>
      </div>
      <div sx={{ fontSize: 2, minHeight: [10], textAlign: "center" }}>
        <Styled.p sx={{ my: 1 }}>{body2}</Styled.p>
      </div>
      <div sx={{ textAlign: "center" }}>
        <Button text={cta} action={action} />
      </div>
    </div>
  )
}

export default Card
