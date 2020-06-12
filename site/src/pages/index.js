/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/atoms/container"
import { useLoadingState, useLoadingDispatch } from "../state"
import { useEffect } from "react"
import Button from "../components/atoms/button"
import Loading from "../components/molecules/loading"
import Blurb from "../components/molecules/blurb"
import Centered from "../components/atoms/centered"
const IndexPage = () => {
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()

  useEffect(() => {
    loadingDispatch({ type: "set", loading: false })
  }, [loadingDispatch])

  return (
    <Layout>
      <SEO title="Fantasy Football" />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Centered>
            <Styled.h3 sx={{ bg: "primary" }}>Who scores the goals</Styled.h3>
          </Centered>
          <Styled.h3 sx={{ textAlign: "center", my: 0 }}>&</Styled.h3>
          <Centered>
            <Styled.h3 sx={{ bg: "primary" }}>Who makes the assists</Styled.h3>
          </Centered>
          <Styled.h5 sx={{ textAlign: "center" }}>
            Nothing else matters
          </Styled.h5>
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
            <Blurb text="Register" />
            <Blurb text="Pick 3 Players" />
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
          <Centered>
            <Link
              sx={{
                justifySelf: "center",
                textDecoration: "none",
                mx: 4,
                mt: 5
              }}
              to="/fantasy/"
            >
              <Button
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
                fontSize={3}
                height={40}
                color="background"
                bg="red"
                // bg="primary"
              >
                REGISTER
              </Button>
            </Link>
            <Link
              sx={{
                justifySelf: "center",
                textDecoration: "none",
                mx: 4,
                mt: 5
              }}
              to="/fantasy/"
            >
              <Button
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
                fontSize={2}
                height={35}
                color="primary"
                bg="secondary"
                // bg="primary"
              >
                PLAY
              </Button>
            </Link>
          </Centered>
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage
