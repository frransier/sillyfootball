/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  FaStar,
  FaUserEdit,
  FaTrophy,
  FaRocket,
  FaTicketAlt,
  FaPlay
} from "react-icons/fa"
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
              Silly Footballers care about two things
            </Styled.h1>

            <Styled.h2
              sx={{
                fontSize: [5],
                fontWeight: 500,
                bg: "primary",
                p: 4,
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
            <Styled.h3 sx={{ textAlign: "center", mt: 6, mb: 0 }}>
              3 easy steps to success
            </Styled.h3>
            <Container columns="1fr 1fr 1fr">
              <div sx={{ textAlign: "center" }}>
                <FaUserEdit
                  sx={{
                    // bg: "secondary",
                    // color: "background",
                    // p: 4,
                    height: 20,
                    width: 20
                  }}
                />
                <Styled.h5 sx={{ m: 2 }}>Register</Styled.h5>
              </div>
              <div sx={{ textAlign: "center" }}>
                <FaRocket
                  sx={{
                    // bg: "secondary",
                    // color: "background",
                    // p: 4,
                    height: 20,
                    width: 20
                  }}
                />
                <Styled.h5 sx={{ m: 2 }}>Pick 3 players</Styled.h5>
              </div>
              <div sx={{ textAlign: "center" }}>
                <FaTrophy
                  sx={{
                    // bg: "secondary",
                    // color: "background",
                    // p: 4,
                    height: 20,
                    width: 20
                  }}
                />
                <Styled.h5 sx={{ m: 2 }}>Win</Styled.h5>
              </div>
            </Container>
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
                fontSize={6}
                height={45}
                color="text"
                bg="primary"
              >
                PLAY
              </Button>
            </Link>
            <Container>
              <Styled.h2>
                The best leagues in one fantasy football game
              </Styled.h2>
              <Styled.p sx={{ fontSize: 3 }}>
                Each round of Silly Football consists of the best matches from
                Premier League, Bundesliga, La Liga, Serie A and more.
              </Styled.p>
            </Container>
          </Container>
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage
