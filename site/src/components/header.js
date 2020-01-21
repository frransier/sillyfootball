/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link, navigate } from "gatsby"
import icon from "../images/icon-v1.svg"
import iconDark from "../images/icon-dark.svg"
import { useColorMode } from "theme-ui"
import { useAuth } from "react-use-auth"
import { FaUserAlt, FaUserCheck } from "react-icons/fa"
import { useUserState } from "../state"

const Header = () => {
  const userState = useUserState()
  const [colorMode] = useColorMode()
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
        gridTemplateColumns: "20% 20% 20% 20% 20%",
        height: 60,
        alignItems: "center",
        justifyItems: "center",
        zIndex: 1000,
        bg: "background",
        position: "sticky",
        top: 0,
        mb: 3,
      }}
    >
      <Link to="/">
        <img
          sx={{ height: 35, mx: "auto" }}
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
            fontWeight: 400,
            borderRadius: 2,
            background: colorMode === "default" ? "#FF5252" : "#67FFBF",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
          }}
          to="/nyheter/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontWeight: 700,
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
            fontWeight: 400,
            borderRadius: 2,
            background: colorMode === "default" ? "#FF5252" : "#67FFBF",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
          }}
          to="/livescore/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontWeight: 700,
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
            fontWeight: 400,
            borderRadius: 2,
            background: colorMode === "default" ? "#FF5252" : "#67FFBF",
            color: colorMode === "default" ? "#fff" : "#2F2F2F",
          }}
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 2,
            paddingBottom: 2,
            fontWeight: 700,
          }}
        >
          Fantasy
        </Link>
      </Styled.h3>

      <div sx={{ justifySelf: "center" }}>
        <button
          sx={{
            bg: "background",
            color: "text",
            border: "none",
            fontSize: 3,
            mt: 2,
            pointer: "cursor",

            appearance: "none",
          }}
          aria-label="Login"
          onClick={() => Login()}
        >
          {userState && userState.id ? (
            <FaUserCheck size={19}></FaUserCheck>
          ) : (
            <FaUserAlt></FaUserAlt>
          )}
        </button>
      </div>
    </div>
  )
}

export default Header
