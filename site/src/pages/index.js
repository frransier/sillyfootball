/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/atoms/container"
import { useGlobalState, useGlobalDispatch } from "../state"
import { useEffect } from "react"
import { useAuth0 } from "../state/auth0"
import Button from "../components/atoms/button"
import Loading from "../components/molecules/loading"
import Blurb from "../components/molecules/blurb"
import Centered from "../components/atoms/centered"
const IndexPage = () => {
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()
  const { loginWithRedirect } = useAuth0()

  useEffect(() => {
    dispatch({ type: "set-loading", payload: false })
  }, [dispatch])

  return (
    <Layout>
      <SEO title="Fantasy Football" />
      {state && state.loading ? (
        <Loading />
      ) : (
        <Container>
          <Styled.h4 sx={{ textAlign: "center", fontWeight: 500 }}>
            Two Things Are Important
          </Styled.h4>
          <Centered>
            <Styled.h4 sx={{ bg: "primary", textTransform: "uppercase" }}>
              Who Scores The Goals
            </Styled.h4>
          </Centered>
          <Centered>
            <Styled.h4 sx={{ my: 0 }}>&</Styled.h4>
          </Centered>
          <Centered>
            <Styled.h4 sx={{ bg: "primary", textTransform: "uppercase" }}>
              Who makes the assists
            </Styled.h4>
          </Centered>

          {/* <Styled.h5 sx={{ textAlign: "center" }}>
            Fantasy Football without the noise
          </Styled.h5> */}
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              justifyItems: "center",
              // boxShadow: "1px 1px 4px darkgrey",
              height: 70,
              // bg: "secondary",
              p: 3,
              my: 4
            }}
          >
            <Blurb text="Pick 3 Players" />
            <Blurb text="Follow Live" />
            <Blurb text="Get Hooked" />
          </div>
          <Styled.h4 sx={{ textAlign: "center", fontWeight: 500 }}>
            Football is better with skin in the game
          </Styled.h4>
          <Container mt={4}>
            {state && !state.user && (
              <div sx={{ justifySelf: "center", width: [110, 150], my: 4 }}>
                <Button
                  dispatch={() =>
                    loginWithRedirect({
                      prompt: "login",
                      screen_hint: "signup"
                    })
                  }
                  fontSize={[2, 3]}
                  height={40}
                  color="background"
                  bg="red"
                  // bg="primary"
                >
                  REGISTER
                </Button>
              </div>
            )}
            {/* </Link> */}
            <Link
              sx={{
                justifySelf: "center",

                my: 4,
                textDecoration: "none"

                // mt: 5
              }}
              to="/fantasy/"
            >
              <Button
                dispatch={() =>
                  dispatch({ type: "set-loading", payload: true })
                }
                fontSize={[2, 3]}
                height={40}
                width={[80]}
                color="background"
                bg="secondary"
                // bg="primary"
              >
                PLAY
              </Button>
            </Link>
          </Container>
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage
