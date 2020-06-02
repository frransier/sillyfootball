/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { FaHome } from "react-icons/fa"
import { useLoadingDispatch, useUserState } from "../state"
import { useAuth } from "react-use-auth"
import Container from "../components/atoms/container"

const Footer = () => {
  const loadingDispatch = useLoadingDispatch()
  const userState = useUserState()
  const { login } = useAuth()
  return (
    <Container mb={5} columns={["50% 50%", "37% 63%"]}>
      <Link
        to="/"
        sx={{
          textDecoration: "none",
          alignSelf: "center",
          color: "lightgrey",
          border: "solid 3px lightgrey",
          borderBottom: "none",
          borderRadius: 8,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          p: 1,
          pb: 0
        }}
      >
        <Styled.h1 sx={{ my: 0, textAlign: "center", fontSize: [4, 5] }}>
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
            color: "lightgrey",

            alignSelf: "end",
            justifySelf: "end",

            "&.active": {
              color: "primary"
            }
          }}
          onClick={() => loadingDispatch({ type: "set", loading: true })}
        >
          <Styled.h2 sx={{ my: 0, mx: 0, fontSize: [1, 2] }}>
            Livescore
          </Styled.h2>
        </Link>
        {userState && (
          <Link
            to="/account/"
            activeClassName="active"
            sx={{
              textDecoration: "none",
              color: "lightgrey",
              height: "20px",
              justifySelf: ["center", "center"],
              alignSelf: "end",
              "&.active": {
                color: "primary"
              }
            }}
            onClick={() => loadingDispatch({ type: "set", loading: true })}
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
              alignSelf: "end",
              justifySelf: "center"
            }}
            aria-label="Login"
            onClick={login}
          >
            <FaHome size={20} />
          </button>
        )}
      </div>
    </Container>
  )
}

export default Footer
