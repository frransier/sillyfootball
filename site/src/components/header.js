/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState, useLoadingDispatch } from "../state"
import { FaHome } from "react-icons/fa"

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
        gridTemplateColumns: ["59% 41%", "37% 63%"],
        bg: "bg",
        // border: "solid 3px lightgrey",
        // borderBottom: "solid 1px lightgrey",
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        px: 1,
        py: 2,
        boxShadow: "1px 1px 7px darkgrey"

        // boxShadow: "0px 2px 0px lightgrey"
      }}
    >
      <Link
        to="/"
        sx={{
          textDecoration: "none",
          alignSelf: "center",
          color: "white"
          // bg: "red",
          // border: "solid 3px red",
          // borderBottom: "none",
          // borderRadius: 8,
          // borderBottomLeftRadius: 0,
          // borderBottomRightRadius: 0,
          // borderTopRightRadius: 0,
          // p: 1,
          // boxShadow: "4px 4px 4px darkgrey"
          // pb: 0
        }}
      >
        <Styled.h1
          sx={{
            my: 0,
            color: "text",
            textAlign: "center",
            fontSize: [5]
            // textShadow: "2px 2px 0px  black"
          }}
        >
          SILLY FOOTBALL
        </Styled.h1>
      </Link>

      <div
        sx={{ display: "grid", gridTemplateColumns: ["70% 30%", "80% 20%"] }}
      >
        <Link
          to="/livescore/"
          activeClassName="active"
          sx={{
            textDecoration: "none",
            color: "text",
            pb: 1,
            alignSelf: "end",
            justifySelf: "end"
            // textShadow: "1px 1px 0px  black"

            // "&.active": {
            //   color: "red"
            // }
          }}
          onClick={() => loadingDispatch({ type: "set", loading: true })}
        >
          <Styled.h2 sx={{ my: 0, mx: 0, fontSize: [2, 3] }}>
            Livescore
          </Styled.h2>
        </Link>
        {userState && (
          <Link
            to="/account/"
            activeClassName="active"
            sx={{
              textDecoration: "none",
              color: "text",
              height: "24px",

              justifySelf: ["center", "center"],
              alignSelf: "end"
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
              bg: "red",
              textDecoration: "none",
              color: "white",
              height: "26px",

              justifySelf: ["center", "center"],
              alignSelf: "end"
            }}
            aria-label="Login"
            onClick={login}
          >
            <FaHome size={20} />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
