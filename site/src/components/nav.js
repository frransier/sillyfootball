/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import { Link } from "gatsby"

const Nav = () => {
  const [colorMode] = useColorMode()
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Styled.h3
        sx={{
          mx: [8, 9],
          fontWeight: "heading",
          fontFamily: "body",
        }}
      >
        <Link
          activeStyle={{
            background: colorMode === "default" ? "#FF5252" : "#67FFBF",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
            borderRadius: 4,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontWeight: 700,
          }}
          to="/nyheter/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Nyheter
        </Link>
      </Styled.h3>
      <div sx={{ mx: "auto" }}></div>
      <div sx={{ mx: 6 }}>
        <Styled.h3
          sx={{
            fontWeight: "heading",
            fontFamily: "body",
          }}
        >
          <Link
            activeStyle={{
              background: colorMode === "default" ? "#FF5252" : "#67FFBF",
              color: colorMode === "default" ? "#fff" : "#2F2F2F",
              borderRadius: 4,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 2,
              paddingBottom: 2,
              fontWeight: 700,
            }}
            to="/livescore/"
            style={{
              textDecoration: "none",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            Livescore
          </Link>
        </Styled.h3>
      </div>
      <div sx={{ mx: "auto" }}></div>
      <Styled.h3
        sx={{
          mx: [8, 9],
          fontWeight: "heading",
          fontFamily: "body",
        }}
      >
        <Link
          to="/fantasy/"
          activeStyle={{
            background: colorMode === "default" ? "#FF5252" : "#67FFBF",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
            borderRadius: 4,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontWeight: 700,
          }}
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Fantasy
        </Link>
      </Styled.h3>
    </div>
  )
}

export default Nav
