/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState, useLoadingDispatch } from "../state"
import { FaHome, FaSuperpowers } from "react-icons/fa"
import Frame from "./atoms/frame"

const Header = () => {
  const { login } = useAuth()
  const userState = useUserState()
  const loadingDispatch = useLoadingDispatch()

  return (
    <header
      sx={{
        display: "grid",
        gridTemplateColumns: ["12% 50% 25% 13%", "6% 50% 36% 8%"],
        alignItems: "center",
        justifyItems: "center",
        bg: "bg",
        pt: 5,
        mx: 4
      }}
    >
      <Link
        to="/"
        sx={{
          textDecoration: "none",
          color: "white"
          // justifySelf: "start"
        }}
      >
        <Frame borderWidth={1} borderRadius={6}>
          <div
            sx={{
              display: "grid",
              bg: "secondary",
              color: "primary",
              width: 25,
              height: 25,
              borderRadius: 4
            }}
          >
            <FaSuperpowers
              sx={{ height: 25, justifySelf: "center", color: "primary" }}
            />
          </div>
        </Frame>
      </Link>
      <Styled.h1
        sx={{
          m: 0,
          mx: 3,
          color: "secondary",
          fontSize: 4,
          justifySelf: "start",
          alignSelf: "center"
          // textShadow: "1px 1px 0px primary"
        }}
      >
        SILLY FOOTBALL
      </Styled.h1>

      <Link
        to="/livescore/"
        activeClassName="active"
        sx={{
          textDecoration: "none",
          color: "secondary",
          alignSelf: "center",
          justifySelf: "center"

          // "&.active": {
          //   color: "red"
          // }
        }}
        onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h2 sx={{ m: 0, fontSize: 2 }}>Livescore</Styled.h2>
      </Link>
      {userState && (
        <Link
          to="/account/"
          activeClassName="active"
          sx={{
            textDecoration: "none",
            color: "secondary",
            height: "24px"
            // "&.active": {
            //   color: "red"
            // }
          }}
          onClick={() => loadingDispatch({ type: "set", loading: true })}
        >
          <FaHome sx={{}} size={20} />
        </Link>
      )}
      {!userState && (
        <button
          sx={{
            cursor: "pointer",
            appearance: "none",
            outline: "none",
            border: "none",
            bg: "white",
            textDecoration: "none",
            color: "secondary",
            height: "25px"
          }}
          aria-label="Login"
          onClick={login}
        >
          <FaHome size={20} />
        </button>
      )}
    </header>
  )
}

export default Header
