/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

const Card = ({ icon, title, body, cta, slug }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "100%",
        justifyItems: "center",
        alignItems: "center",
        border: "solid 2px",
        borderColor: "muted",
        mx: 2,
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
      <div
        sx={{
          display: "grid",
          justifyContent: "center",
        }}
      >
        <div sx={{ mx: "auto", alignSelf: "end" }}>
          <Link to={slug} style={{ textDecoration: "none" }}>
            <Styled.h2
              sx={{
                textAlign: "center",
                borderBottom: "solid 1px",
                borderBottomColor: "primary",
              }}
            >
              {cta}
            </Styled.h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
