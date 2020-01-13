/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { Link } from "gatsby"
import nyheter from "../images/nyheter.svg"
import livescore from "../images/livescore.svg"
import fantasy from "../images/fantasyNav.svg"
import nyheterDark from "../images/nyheter-dark.svg"
import livescoreDark from "../images/livescore-dark.svg"
import fantasyDark from "../images/fantasyNav-dark.svg"

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
      <div sx={{ width: "auto", mx: "auto" }} />
      <Link to="/nyheter" style={{ textDecoration: "none" }}>
        <img
          sx={{
            width: 70,
            height: 15,
            mx: "auto",
            my: 5,
          }}
          src={colorMode === "default" ? nyheter : nyheterDark}
          alt="News"
        />
      </Link>

      <div sx={{ mx: [8, 9] }}>
        <Link to="/livescore" style={{ textDecoration: "none" }}>
          <img
            sx={{
              width: 90,
              height: 15,
              mx: "auto",
              my: 5,
            }}
            src={colorMode === "default" ? livescore : livescoreDark}
            alt="Livescore"
          />
        </Link>
      </div>

      <Link to="/fantasy" style={{ textDecoration: "none" }}>
        <img
          sx={{
            width: 70,
            height: 15,
            mx: "auto",
            my: 5,
          }}
          src={colorMode === "default" ? fantasy : fantasyDark}
          alt="Fantasy Football"
        />
      </Link>
      <div sx={{ width: "auto", mx: "auto" }} />
    </div>
  )
}

export default Nav
