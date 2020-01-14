/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

const Nav = () => {
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div sx={{ width: "auto", mx: "auto" }} />
      <Link to="/nyheter" style={{ textDecoration: "none" }}>
        <Styled.h3>Nyheter</Styled.h3>
      </Link>

      <div sx={{ mx: [8, 9] }}>
        <Link to="/livescore" style={{ textDecoration: "none" }}>
          <Styled.h3>Livescore</Styled.h3>
        </Link>
      </div>

      <Link to="/fantasy" style={{ textDecoration: "none" }}>
        <Styled.h3>Fantasy</Styled.h3>
      </Link>
      <div sx={{ width: "auto", mx: "auto" }} />
    </div>
  )
}

export default Nav
