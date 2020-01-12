/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Button from "../button"

const Card = ({ icon, title, body, cta, action }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "100%",
        justifyItems: "center",
        alignItems: "center",

        border: "solid 2px",
        borderColor: "muted",

        my: 7,
        borderRadius: 4,
      }}
    >
      <div sx={{ fontSize: 7, pt: 6, textAlign: "center" }}>{icon}</div>
      <Styled.h2
        sx={{
          textAlign: "center",
          my: 1,
          fontSize: 3,
        }}
      >
        {title}
      </Styled.h2>
      <div sx={{ fontSize: 2, mx: 5, minHeight: [0, 60] }}>
        <Styled.p sx={{ my: 3 }}>{body}</Styled.p>
      </div>
      <Button text={cta} action={action} />
    </div>
  )
}

export default Card
