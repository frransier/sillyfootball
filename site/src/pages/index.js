/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Footer from "../components/footer"
import SEO from "../components/seo"
import { FaStar } from "react-icons/fa"
import Container from "../components/atoms/container"
import { useLoadingState, useLoadingDispatch, useUserState } from "../state"
import { useEffect, Fragment } from "react"
import { FaHome } from "react-icons/fa"
import { useAuth } from "react-use-auth"
import Button from "../components/atoms/button"
import Loading from "../components/molecules/loading"

const IndexPage = () => {
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()
  const userState = useUserState()
  const { login } = useAuth()

  useEffect(() => {
    loadingDispatch({ type: "set", loading: false })
  }, [loadingDispatch])

  return (
    <Layout>
      <SEO title="Fantasy Football" />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Container />
          <Container columns={["72% 28%", "60% 40%"]}>
            <Styled.h1
              sx={{
                alignSelf: "center",
                justifySelf: "start",
                fontSize: [5, 6]
              }}
            >
              FANTASY FOOTBALL
            </Styled.h1>
            <Link sx={{ justifySelf: "start" }} to="/fantasy/">
              <Button
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
                fontSize={[5]}
              >
                PLAY
              </Button>
            </Link>
          </Container>

          <Container>
            <Styled.h2 sx={{}}>Simple Rules</Styled.h2>
            <Styled.p sx={{ fontSize: 2 }}>
              Pick 3 players from the available matches.
              <br />
              <br />
              <FaStar /> players generate 1 point per goal or assist.
              <br />
              All other players generate 1.5 points per goal or assist.
              <br />
              <br />
              Get the highest score to win.
            </Styled.p>
          </Container>
          <Container>
            <Styled.h2 sx={{}}>What is Silly Football?</Styled.h2>
            <Styled.p sx={{ fontSize: 2 }}>
              Silly Football is an online fantasy football game that covers the
              best matches from Premier League, La Liga, Bundesliga, Serie A and
              Champions League. <br />
              <br />
              Play for free against others and your friends.
            </Styled.p>
          </Container>
          <Container>
            <Link
              sx={{
                alignSelf: "center",
                justifySelf: ["center", "center"],
                mx: [4, 0]
              }}
              to={userState && userState._id ? "/account/" : "/"}
            >
              <Button
                dispatch={
                  userState && userState._id
                    ? () => loadingDispatch({ type: "set", loading: true })
                    : () => login()
                }
                fontSize={[5]}
              >
                {userState && userState._id ? "HOME" : "JOIN NOW"}
              </Button>
            </Link>
          </Container>
          <Footer />
        </Fragment>
      )}
    </Layout>
  )
}

export default IndexPage
