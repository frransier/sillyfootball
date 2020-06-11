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
          <Styled.h5 sx={{ textAlign: "center" }}>
            Two things are equally important
          </Styled.h5>

          <Centered>
            <Styled.h4 sx={{ bg: "primary" }}>Who scores the goals</Styled.h4>
          </Centered>
          <Styled.h3 sx={{ textAlign: "center", my: 0 }}>&</Styled.h3>
          <Centered>
            <Styled.h4 sx={{ bg: "primary" }}>Who makes the assists</Styled.h4>
          </Centered>
          <Styled.h5 sx={{ textAlign: "center" }}>
            Fantasy Football without all the noise
          </Styled.h5>
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
              fontSize={4}
              height={45}
              color="primary"
              // bg="primary"
            >
              PLAY
            </Button>
          </Link>
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage
