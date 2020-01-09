/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import icon from "../images/icon.svg"
import iconDark from "../images/icon-dark.svg"
import { useColorMode } from "theme-ui"
import { useAuth } from "react-use-auth"
import { FaUserAlt } from "react-icons/fa"
import { FiSun } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"

const Header = () => {
  const [colorMode, setColorMode] = useColorMode()
  const { login } = useAuth()
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        height: 38,
        alignItems: "center",
        justifyItems: "center",
        zIndex: 1000,
        bg: "background",
        position: "sticky",
        top: 0,
        pt: 5,
        pb: 5,
      }}
    >
      <button
        sx={{
          bg: "background",
          color: "primary",
          border: "none",
          fontSize: 4,
          mx: 4,
        }}
        aria-label="Color Mode"
        onClick={() =>
          setColorMode(colorMode === "default" ? "dark" : "default")
        }
      >
        {colorMode === "default" ? <IoMdMoon></IoMdMoon> : <FiSun></FiSun>}
      </button>
      {/* <div sx={{ mx: "auto" }}></div> */}
      <Link to="/">
        <img
          sx={{ height: 40, mx: "auto" }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Sillyfootball Logo"
        />
      </Link>
      {/* <div sx={{ mx: "auto" }}></div> */}
      <button
        sx={{
          bg: "background",
          color: "text",
          border: "none",
          fontSize: 4,
          mx: 4,
        }}
        aria-label="Login"
        onClick={login}
      >
        <FaUserAlt></FaUserAlt>
      </button>
    </div>
  )
}

export default Header
