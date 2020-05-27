/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import ReactLoading from "react-loading"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaStar } from "react-icons/fa"
import Button from "../components/atoms/button"
import Container from "../components/atoms/container"
import { useLoadingState, useLoadingDispatch } from "../state"
import Centered from "../components/atoms/centered"
import { useEffect } from "react"
import AltButton from "../components/atoms/altButton"

const IndexPage = () => {
  const loading = useLoadingState()
  const loadingDispatch = useLoadingDispatch()

  useEffect(() => {
    loadingDispatch({ type: "set", loading: false })
  }, [])

  return (
    <Layout>
      <SEO title="Fantasy Football" />
      {loading ? (
        <Centered height="50vh">
          <ReactLoading type="bars" color="red" height={35} width={35} />
        </Centered>
      ) : (
        <>
          <Container />
          <Container columns="70% 30%">
            {/* <div sx={{ alignSelf: "center", justifySelf: "center" }}> */}
            {/* </div> */}

            <Styled.h1 sx={{ alignSelf: "center", justifySelf: "start" }}>
              FANTASY FOOTBALL
            </Styled.h1>
            <Link sx={{ justifySelf: "start" }} to="/fantasy/">
              <AltButton
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
              >
                PLAY
              </AltButton>
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
              to="/fantasy/"
            >
              <AltButton
                dispatch={() => loadingDispatch({ type: "set", loading: true })}
              >
                PLAY
              </AltButton>
            </Link>
          </Container>
        </>
      )}
    </Layout>
  )
}

export default IndexPage
