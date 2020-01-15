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
      <Link to="/nyheter" style={{ textDecoration: "none" }}>
        <Styled.h2 sx={{ mx: 7 }}>Nyheter</Styled.h2>
      </Link>
      <div sx={{ mx: "auto" }}></div>
      <div sx={{ mx: [6, 10] }}>
        <Link to="/livescore" style={{ textDecoration: "none" }}>
          <Styled.h2>Livescore</Styled.h2>
        </Link>
      </div>
      <div sx={{ mx: "auto" }}></div>
      <Link to="/fantasy" style={{ textDecoration: "none" }}>
        <Styled.h2 sx={{ mx: 7 }}>Fantasy</Styled.h2>
      </Link>
    </div>
  )
}

export default Nav
