/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
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
        gridTemplateColumns: "15% 20% 20% 20% 13% 12%",
        height: 50,
        alignItems: "center",
        justifyItems: "center",
        zIndex: 1000,
        bg: "primary",
        position: "sticky",
        top: 0,
        mb: 7,
      }}
    >
      <Link to="/">
        <img
          sx={{ height: 45, mx: "auto" }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Sillyfootball Logo"
        />
      </Link>
      <Styled.h3
        sx={{
          mx: [8, 9],
          fontWeight: "body",
          fontFamily: "body",
        }}
      >
        <Link
          activeStyle={{
            fontWeight: 700,
          }}
          to="/nyheter/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Nyheter
        </Link>
      </Styled.h3>

      <Styled.h3
        sx={{
          fontWeight: "body",
          fontFamily: "body",
        }}
      >
        <Link
          activeStyle={{
            fontWeight: 700,
          }}
          to="/livescore/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Livescore
        </Link>
      </Styled.h3>

      <Styled.h3
        sx={{
          mx: [8, 9],
          fontWeight: "body",
          fontFamily: "body",
        }}
      >
        <Link
          to="/fantasy/"
          activeStyle={{
            fontWeight: 700,
          }}
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Fantasy
        </Link>
      </Styled.h3>

      <button
        sx={{
          bg: "primary",
          color: userState && userState.name ? "background" : "background",
          border: "none",
          fontSize: 3,
          mt: 2,
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
      <button
        sx={{
          bg: "primary",
          color: "background",
          border: "none",
          fontSize: 3,
          pointer: "cursor",
          mt: 2,
        }}
        aria-label="Color Mode"
        onClick={() =>
          setColorMode(colorMode === "default" ? "dark" : "default")
        }
      >
        {colorMode === "default" ? <IoMdMoon></IoMdMoon> : <FiSun></FiSun>}
      </button>
    </div>
  )
}

export default Header
