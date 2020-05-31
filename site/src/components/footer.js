/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { FaHome } from "react-icons/fa"
import { useLoadingDispatch } from "../state"

const Footer = () => {
  const loadingDispatch = useLoadingDispatch()
  return (
    <footer
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 2,
        mt: 4,
        color: "lightgrey"
      }}
    >
      <Link
        to="/fantasy/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "lightgrey",

          alignSelf: "center",
          justifySelf: "end"
        }}
        onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h1 sx={{ mx: 1, my: 0 }}>SILLY FOOTBALL</Styled.h1>
      </Link>

      <div sx={{ mx: "auto" }} />
      {/* <Link
        to="/blog/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "lightgrey",

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
          color: "lightgrey",

          alignSelf: "end",
          justifySelf: "end",

          "&.active": {
            color: "red"
          }
        }}
        // onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h3 sx={{ ml: 3 }}>About</Styled.h3>
      </Link> */}
      <Link
        to="/livescore/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "lightgrey",

          alignSelf: "end",
          justifySelf: "end",

          "&.active": {
            color: "red"
          }
        }}
        onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h3 sx={{ ml: 3 }}>Livescore</Styled.h3>
      </Link>
      <Link
        to="/account/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "lightgrey",

          alignSelf: "center",
          justifySelf: "end",

          "&.active": {
            color: "red"
          }
        }}
        onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <FaHome sx={{ ml: 3 }} size={22} />
      </Link>
    </footer>
  )
}

export default Footer
