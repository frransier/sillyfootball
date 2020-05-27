/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState, useLoadingDispatch } from "../state"
import { FaHome } from "react-icons/fa"
import silly from "../images/silly-alt.png"
// import { useEffect } from "react"

const Header = () => {
  const { login } = useAuth()
  const userState = useUserState()
  const loadingDispatch = useLoadingDispatch()

  // useEffect(() => {
  //   console.log(userState)
  // }, [userState])
  return (
    <header
      sx={{
        display: "grid",
        gridTemplateColumns: ["60% 40%", "37% 63%"]

        // boxShadow: "0px 2px 0px lightgrey"
      }}
    >
      <Link
        to="/"
        sx={{
          // display: "flex",
          textDecoration: "none",
          alignSelf: "center",
          color: "text",
          border: "solid 5px red",
          borderBottom: "none",
          borderRadius: 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          p: 1,
          pb: 0
        }}
      >
        <Styled.h1 sx={{ my: 0, textAlign: "center" }}>
          SILLY FOOTBALL
        </Styled.h1>
        {/* <Styled.h1 sx={{ my: 0, mx: 3 }}>FOOTBALL</Styled.h1> */}
      </Link>

      <div
        sx={{ display: "grid", gridTemplateColumns: ["60% 40%", "80% 20%"] }}
      >
        <Link
          to="/livescore/"
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
          onClick={() => loadingDispatch({ type: "set", loading: true })}
        >
          <Styled.h6 sx={{ my: 2, mx: 0 }}>Livescore</Styled.h6>
        </Link>
        {userState && (
          <Link
            to="/account/"
            activeClassName="active"
            sx={{
              textDecoration: "none",
              color: "text",
              mr: [0, 2],
              alignSelf: "end",
              justifySelf: ["center", "end"],

              "&.active": {
                color: "red"
              }
            }}
          >
            <FaHome size={20} />
          </Link>
        )}
        {!userState && (
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "background",
              border: "none",
              p: 0,
              alignSelf: "center",
              justifySelf: "center"
            }}
            aria-label="Login"
            onClick={login}
          >
            <Styled.h4 sx={{ m: 2 }}>Login</Styled.h4>
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
