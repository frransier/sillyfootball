/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState, useLoadingDispatch } from "../state"
import { FaHome } from "react-icons/fa"
import { RiHome2Line } from "react-icons/ri"
import logo from "../images/primary.png"
import Frame from "./atoms/frame"

const Header = () => {
  const { login } = useAuth()
  const userState = useUserState()
  const loadingDispatch = useLoadingDispatch()

  return (
    <header
      sx={{
        display: "grid",
        gridTemplateColumns: ["12% 45% 30% 13%", "8% 64% 20% 8%"],
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
        <Frame borderWidth={1} borderRadius={999}>
          <div
            sx={{
              display: "grid",
              bg: "secondary",
              color: "primary",
              width: 35,
              height: 35,
              borderRadius: 999
            }}
          >
            <img
              src={logo}
              alt="Silly Football Logo"
              sx={{ width: 23, alignSelf: "center", justifySelf: "center" }}
            />
          </div>
        </Frame>
      </Link>
      <Styled.h1
        sx={{
          m: 0,
          mx: 3,
          // color: ["background", "background"],
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
          textAlign: "center",
          color: "text",
          bg: "background",
          p: 3,
          alignSelf: "center",
          // mx: ["", 4],
          justifySelf: ["center", "end"],
          borderRadius: 3,
          width: "100%"

          // "&.active": {
          //   color: "red"
          // }
        }}
        onClick={() => loadingDispatch({ type: "set", loading: true })}
      >
        <Styled.h5 sx={{ m: 0, fontWeight: 700 }}>Livescore</Styled.h5>
      </Link>
      {userState && (
        <Link
          to="/account/"
          activeClassName="active"
          sx={{
            textDecoration: "none",
            // textAlign: "center",
            color: "text"
            // bg: "background",
            // p: 3,

            // borderRadius: 3,
            // width: "95%"
            // "&.active": {
            //   color: "red"
            // }
          }}
          onClick={() => loadingDispatch({ type: "set", loading: true })}
        >
          <div
            sx={{
              display: "grid",
              bg: "secondary",
              color: "primary",
              boxShadow: "1px 1px 4px darkgrey",
              width: 28,
              height: 28,
              borderRadius: 999
            }}
          >
            <RiHome2Line
              sx={{
                alignSelf: "center",
                // mx: [4],
                justifySelf: ["center"]
              }}
              size={20}
            />
          </div>
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
