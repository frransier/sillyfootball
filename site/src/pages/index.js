/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/atoms/container"
import { useGlobalState, useGlobalDispatch } from "../state"
import { useEffect } from "react"
import { register } from "../utils/auth"
import Button from "../components/atoms/button"
import Loading from "../components/molecules/loading"
import Blurb from "../components/molecules/blurb"
import Centered from "../components/atoms/centered"
const IndexPage = () => {
  // const loadingDispatch = useLoadingDispatch()
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  // useEffect(() => {
  //   console.log(state)
  // }, [state])
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
          <Styled.h4 sx={{ textAlign: "center", fontWeight: 500 }}>
            Play Hassle-Free Fantasy Football
          </Styled.h4>
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
          {/* <Styled.p sx={{ fontSize: 2, textAlign: "center", mt: 5 }}>
            <FaStar /> players generate 1 point per goal or assist. <br />
            <br />
            All other players generate 1.5 points per goal or assist.
            <br />
            <br />
            Get the highest score to win.
          </Styled.p> */}
          <Container mt={4}>
            {/* <Link
              sx={{
                justifySelf: "center",
                textDecoration: "none",
                mx: 4,
                mt: 5
              }}
              to="/fantasy/"
            > */}
            {state && !state.user && (
              <div sx={{ justifySelf: "center", width: [110, 150], my: 4 }}>
                <Button
                  dispatch={() => register()}
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
                width: [105, 150],
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
                width={105}
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
