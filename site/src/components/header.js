/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { useAuth } from "react-use-auth"
import { useUserState, useLoadingDispatch } from "../state"
import { FaHome, FaTrophy, FaSuperpowers } from "react-icons/fa"

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
        // px: 1,
        py: 2,
        // boxShadow: "1px 1px 7px darkgrey"
        mx: 1
        // boxShadow: "0px 2px 0px lightgrey"
      }}
    >
      <Link
        to="/"
        sx={{
          textDecoration: "none",
          alignSelf: "start",
          justifySelf: "start",
          display: "flex",
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
        <div
          sx={{
            bg: "secondary",
            color: "primary",
            width: 25,
            height: 25,
            mr: 2,
            display: "grid",
            flexDirection: "column",
            borderRadius: 9
          }}
        >
          <FaSuperpowers sx={{ height: 25, justifySelf: "center" }} />
        </div>
        <Styled.h1
          sx={{
            my: [1, 0],
            color: "secondary",
            textAlign: "start",
            fontSize: [4]
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
            color: "secondary",
            // pb: 1,
            alignSelf: "center",
            justifySelf: ["center", "end"]
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
              color: "secondary",
              height: "25px",

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
              bg: "white",
              textDecoration: "none",
              color: "secondary",
              height: "24px",

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
