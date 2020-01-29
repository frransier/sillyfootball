/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import logo from "../images/icon-v2.svg"
import logoDark from "../images/icon-v2-dark.svg"
import { useColorMode } from "theme-ui"
import { FiSun } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div sx={{ my: 7 }}>
      <div sx={{ textAlign: "center", mt: 5 }}>
        <Link to="/">
          <img
            height={40}
            src={colorMode === "default" ? logo : logoDark}
            alt="Sillyfootball icon"
          ></img>
        </Link>
      </div>
      <Link to="/regler/" style={{ textDecoration: "none" }}>
        <div
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Styled.h2 sx={{ my: 4 }}>Så funkar det</Styled.h2>
        </div>
      </Link>
      <div sx={{ textAlign: "center", mb: 8, mt: 5 }}>
        <button
          sx={{
            color: "primary",
            bg: "background",
            border: "none",
            borderRadius: 2,
            fontSize: 4,
            p: 4,
            pointer: "cursor",
            appearance: "none",
            outline: "none",
          }}
          aria-label="Color Mode"
          onClick={() =>
            setColorMode(colorMode === "default" ? "dark" : "default")
          }
        >
          {colorMode === "default" ? <IoMdMoon></IoMdMoon> : <FiSun></FiSun>}
        </button>
      </div>
    </div>
  )
}

export default Footer
