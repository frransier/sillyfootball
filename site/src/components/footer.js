/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 2,
        mt: 4
      }}
    >
      <Styled.h1 sx={{ color: "black" }}>SF.</Styled.h1>

      <div sx={{ mx: "auto" }} />
      <Link
        to="/blog/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "text",

          alignSelf: "end",
          justifySelf: "end",

          "&.active": {
            color: "red"
          }
        }}
        // onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h3 sx={{ mx: 1 }}>Blog</Styled.h3>
      </Link>
      <Link
        to="/about/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "text",

          alignSelf: "end",
          justifySelf: "end",

          "&.active": {
            color: "red"
          }
        }}
        // onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h3 sx={{ ml: 3 }}>About</Styled.h3>
      </Link>
    </footer>
  )
}

export default Footer
