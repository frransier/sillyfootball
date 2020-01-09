/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { Styled } from "theme-ui"

const Nav = () => (
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
      <Styled.h3
        sx={{ borderBottom: "solid 1px", borderBottomColor: "primary" }}
      >
        NYHETER
      </Styled.h3>
    </Link>

    <div sx={{ mx: [8, 9] }}>
      <Link to="/livescore" style={{ textDecoration: "none" }}>
        <Styled.h3
          sx={{ borderBottom: "solid 1px", borderBottomColor: "primary" }}
        >
          LIVESCORE
        </Styled.h3>
      </Link>
    </div>

    <Link to="/fantasy" style={{ textDecoration: "none" }}>
      <Styled.h3
        sx={{ borderBottom: "solid 1px", borderBottomColor: "primary" }}
      >
        FANTASY
      </Styled.h3>
    </Link>
    <div sx={{ width: "auto", mx: "auto" }} />
  </div>
)

export default Nav
