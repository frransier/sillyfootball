/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link, navigate } from "gatsby"
import icon from "../images/icon-v2.svg"
import iconDark from "../images/icon-v2-dark.svg"
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
        gridTemplateColumns: "17% 22% 22% 22% 17%",
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
          sx={{ height: 40, mx: "auto" }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Sillyfootball Logo"
        />
      </Link>
      <Styled.h3
        sx={{
          letterSpacing: 0.75,
        }}
      >
        <Link
          activeStyle={{
            borderRadius: 6,
            border: "solid 1px",
            borderColor: colorMode === "default" ? "#FF5252" : "#67FFBF",
          }}
          to="/highscore/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 9,
            paddingRight: 9,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Highscore
        </Link>
      </Styled.h3>

      <Styled.h3
        sx={{
          letterSpacing: 0.75,
        }}
      >
        <Link
          activeStyle={{
            borderRadius: 6,
            border: "solid 1px",
            borderColor: colorMode === "default" ? "#FF5252" : "#67FFBF",
          }}
          to="/livescore/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 9,
            paddingRight: 9,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          Livescore
        </Link>
      </Styled.h3>

      <Styled.h3
        sx={{
          letterSpacing: 0.75,
        }}
      >
        <Link
          activeStyle={{
            borderRadius: 6,
            border: "solid 1px",
            borderColor: colorMode === "default" ? "#FF5252" : "#67FFBF",
          }}
          to="/fantasy/"
          style={{
            textDecoration: "none",
            color: colorMode === "default" ? "#2F2F2F" : "#fff",
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 2,
            paddingBottom: 2,
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
