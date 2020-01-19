/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, navigate } from "gatsby"
import icon from "../images/icon-v1.svg"
import iconDark from "../images/icon-v1-dark.svg"
import { useColorMode } from "theme-ui"
import { useAuth } from "react-use-auth"
import { FaUserAlt, FaUserCheck } from "react-icons/fa"
import { FiSun } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"
import { useUserState } from "../state"

const Header = () => {
  const userState = useUserState()
  const [colorMode, setColorMode] = useColorMode()
  const { login } = useAuth()

  function Login() {
    if (userState.length === 0) {
      login()
    } else {
      navigate("/account/")
    }
  }
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        height: 50,
        alignItems: "center",
        justifyItems: "center",
        zIndex: 1000,
        bg: "primary",
        position: "sticky",
        top: 0,

        mb: -3,
      }}
    >
      <button
        sx={{
          bg: "primary",
          color: "background",
          border: "none",
          fontSize: 4,
          mx: 4,
          pointer: "cursor",
        }}
        aria-label="Color Mode"
        onClick={() =>
          setColorMode(colorMode === "default" ? "dark" : "default")
        }
      >
        {colorMode === "default" ? <IoMdMoon></IoMdMoon> : <FiSun></FiSun>}
      </button>

      <Link to="/">
        <img
          sx={{ height: 45, mx: "auto" }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Sillyfootball Logo"
        />
      </Link>
      {/* <div sx={{ mx: "auto" }}></div> */}
      <button
        sx={{
          bg: "primary",
          color: userState && userState.name ? "background" : "background",
          border: "none",
          fontSize: 4,
          mx: 4,
          pointer: "cursor",
        }}
        aria-label="Login"
        onClick={() => Login()}
      >
        {userState && userState.id ? (
          <FaUserCheck size={22}></FaUserCheck>
        ) : (
          <FaUserAlt></FaUserAlt>
        )}
      </button>
    </div>
  )
}

export default Header
