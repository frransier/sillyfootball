/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth0 } from "../state/auth0"
import { useGlobalDispatch, useGlobalState } from "../state"
import { RiHome2Line } from "react-icons/ri"
import logo from "../images/primary.png"

const Footer = () => {
  const { loginWithRedirect } = useAuth0()
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  return (
    <footer sx={{ height: 100, my: 6 }}>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["12% 45% 30% 13%", "8% 64% 20% 8%"],
          alignItems: "center",
          justifyItems: "center",
          bg: "bg",
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
          {/* <Frame borderWidth={0} borderRadius={999}> */}
          <div
            sx={{
              display: "grid",
              bg: "background",
              color: "secondary",
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
          {/* </Frame> */}
        </Link>
        <Styled.h1
          sx={{
            m: 0,
            mx: 3,
            color: ["background", "background"],
            fontSize: 3,
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
            color: "muted",
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
          onClick={() => dispatch({ type: "set-loading", payload: true })}
        >
          <Styled.h5 sx={{ m: 0, fontWeight: 700 }}>Livescore</Styled.h5>
        </Link>
        {state && state.user && (
          <Link
            to="/account/"
            activeClassName="active"
            sx={{
              textDecoration: "none",
              color: "text"
              // "&.active": {
              //   color: "red"
              // }
            }}
            onClick={() => dispatch({ type: "set-loading", payload: true })}
          >
            <div
              sx={{
                display: "grid",
                bg: "background",
                color: "primary",
                // boxShadow: "1px 1px 4px darkgrey",
                width: 28,
                height: 28,
                borderRadius: 999
              }}
            >
              <RiHome2Line
                sx={{
                  alignSelf: "center",
                  // mx: [4],
                  mb: 1,
                  justifySelf: ["center"]
                }}
                size={20}
              />
            </div>
          </Link>
        )}
        {state && !state.user && (
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              border: "none",
              bg: "white",
              textDecoration: "none",
              color: "secondary"
            }}
            aria-label="Login"
            onClick={() => loginWithRedirect({})}
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
          </button>
        )}
      </div>
    </footer>
  )
}

export default Footer
