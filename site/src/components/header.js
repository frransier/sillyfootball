/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState } from "../state"
import { FaHome } from "react-icons/fa"
import silly from "../images/silly-alt.svg"
// import { useEffect } from "react"

const Header = () => {
  const { login } = useAuth()
  const userState = useUserState()

  // useEffect(() => {
  //   console.log(userState)
  // }, [userState])
  return (
    <header
      sx={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        height: 70,
        boxShadow: "0px 2px 2px darkgrey",
      }}
    >
      <Link
        to="/"
        sx={{
          display: "flex",
          textDecoration: "none",
          alignSelf: "center",
          color: "text",
        }}
      >
        <img src={silly} alt="Silly Football Logo" />
      </Link>

      <div sx={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
        <Link
          to="/livescore/"
          activeClassName="active"
          sx={{
            textDecoration: "none",
            color: "text",

            alignSelf: "center",
            justifySelf: "end",

            "&.active": {
              color: "red",
            },
          }}
        >
          <Styled.h5 sx={{ my: 2, mx: 0 }}>Livescore</Styled.h5>
        </Link>
        {userState && (
          <Link
            to="/account/"
            activeClassName="active"
            sx={{
              textDecoration: "none",
              color: "text",
              // mr: 2,
              alignSelf: "center",
              justifySelf: "center",

              "&.active": {
                color: "red",
              },
            }}
          >
            <FaHome size={23} />
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
              justifySelf: "center",
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
