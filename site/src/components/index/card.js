/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Button from "../button"

const Card = ({ icon, title, body, cta, action }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "100%",
        justifyItems: "center",
        alignItems: "center",
        mx: [0, 8],
        my: 7,
        borderRadius: 4,
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
      <div sx={{ fontSize: 2, ml: 6, mr: 4, minHeight: [0, 45] }}>
        <Styled.p sx={{ my: 3 }}>{body}</Styled.p>
      </div>
      <Button text={cta} action={action} />
    </div>
  )
}

export default Card
