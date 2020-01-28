/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link, navigate } from "gatsby"
import icon from "../images/sillyfootball.svg"
import iconDark from "../images/sillyfootball-dark.svg"
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
        my: 5,
        zIndex: 1000,
        bg: "background",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "80% 20%",
          height: 40,
          alignItems: "end",

          // justifyItems: "center",
        }}
      >
        <Link to="/">
          <img
            sx={{ width: "auto", height: 24, mx: 5 }}
            src={colorMode === "default" ? icon : iconDark}
            alt="Sillyfootball Logo"
          />
        </Link>

        <button
          sx={{
            bg: "background",
            color: "text",
            border: "none",
            pointer: "cursor",
            justifySelf: "end",
            mx: 5,
            appearance: "none",
          }}
          aria-label="Login"
          onClick={() => Login()}
        >
          {userState && userState.id ? (
            <FaUserCheck size={20}></FaUserCheck>
          ) : (
            <FaUserAlt size={15}></FaUserAlt>
          )}
        </button>
      </div>
      <div sx={{ display: "flex", mx: 0, mb: 7 }}>
        <Styled.h3
          sx={{
            letterSpacing: 0.5,
            my: 3,
          }}
        >
          <Link
            activeStyle={{
              // backgroundColor: colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              borderBottom: "solid 2px",
              borderBottomColor:
                colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              // fontWeight: 400,
            }}
            to="/fantasy/"
            style={{
              textDecoration: "none",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            Fantasy
          </Link>
        </Styled.h3>

        <Styled.h3
          sx={{
            letterSpacing: 0.5,
            my: 3,
          }}
        >
          <Link
            activeStyle={{
              // backgroundColor: colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              borderBottom: "solid 2px",
              borderBottomColor:
                colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              // fontWeight: 400,
            }}
            to="/highscore/"
            style={{
              textDecoration: "none",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              paddingLeft: 9,
              paddingRight: 9,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            Highscore
          </Link>
        </Styled.h3>

        <Styled.h3
          sx={{
            letterSpacing: 0.5,
            my: 3,
          }}
        >
          <Link
            activeStyle={{
              // backgroundColor: colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              borderBottom: "solid 2px",
              borderBottomColor:
                colorMode === "default" ? "#FD2F2F" : "#67FFBF",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              // fontWeight: 400,
            }}
            to="/livescore/"
            style={{
              textDecoration: "none",
              color: colorMode === "default" ? "#2F2F2F" : "#fff",
              paddingLeft: 11,
              paddingRight: 11,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            Livescore
          </Link>
        </Styled.h3>
      </div>
    </div>
  )
}

export default Header
