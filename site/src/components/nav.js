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
        <Styled.h3
          sx={{
            mx: [8, 9],
            fontWeight: "body",
            fontFamily: "body",
          }}
        >
          Nyheter
        </Styled.h3>
      </Link>
      <div sx={{ mx: "auto" }}></div>
      <div sx={{ mx: 6 }}>
        <Link to="/livescore" style={{ textDecoration: "none" }}>
          <Styled.h3
            sx={{
              fontWeight: "body",
              fontFamily: "body",
            }}
          >
            Livescore
          </Styled.h3>
        </Link>
      </div>
      <div sx={{ mx: "auto" }}></div>
      <Link to="/fantasy" style={{ textDecoration: "none" }}>
        <Styled.h3
          sx={{
            mx: [8, 9],
            fontWeight: "body",
            fontFamily: "body",
          }}
        >
          Fantasy
        </Styled.h3>
      </Link>
    </div>
  )
}

export default Nav
