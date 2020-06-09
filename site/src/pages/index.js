/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaStar } from "react-icons/fa"
import Container from "../components/atoms/container"
import { useLoadingState, useLoadingDispatch } from "../state"
import { useEffect } from "react"
import Button from "../components/atoms/button"
import Loading from "../components/molecules/loading"

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
          <Container>
            <Styled.h1
              sx={{
                mx: 4,
                fontSize: [6]
              }}
            >
              In Silly Football, two things matter
            </Styled.h1>

            <Styled.h2
              sx={{
                fontSize: [5],
                fontWeight: 500,
                textDecoration: "underline",
                textDecorationColor: "red",
                mx: 4,
                mt: [0, 5],
                mb: 0
              }}
            >
              Who scores the goals and who makes the assists
            </Styled.h2>

            <Container mt={5}>
              <Styled.h2>The rules are super simple</Styled.h2>
              <Styled.p sx={{ fontSize: 3 }}>
                Pick 3 players from the available matches.
                <br />
                <br />
                <FaStar /> players generate 1 point per goal or assist. <br />
                All other players generate 1.5 points per goal or assist.
                <br />
                <br />
                Get the highest score to win.
              </Styled.p>
            </Container>
            <Link
              sx={{
                justifySelf: "start",
                textDecoration: "none",
                mx: 4,
                mt: 6
              }}
              to="/fantasy/"
            >
              <Button
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
                fontSize={6}
                height={45}
              >
                PLAY
              </Button>
            </Link>
            <Container>
              <Styled.h2>
                All competitions in one fantasy football game
              </Styled.h2>
              <Styled.p sx={{ fontSize: 3 }}>
                Each round of Silly Football consists of carefully selected top
                matches from Premier League, Bundesliga, La Liga, Serie A and
                more.
              </Styled.p>
            </Container>
            <Container>
              <Styled.h2>Not like other fantasy football games</Styled.h2>
              <Styled.p sx={{ fontSize: 3 }}>
                Traditional fantasy games are played over a season.
              </Styled.p>
            </Container>
          </Container>
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage
