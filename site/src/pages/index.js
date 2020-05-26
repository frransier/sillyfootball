/** @jsx jsx */
import { useState } from "react"
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import ReactLoading from "react-loading"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FaStar } from "react-icons/fa"

const IndexPage = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Layout>
      <SEO title="Fantasy Football" />
      <Styled.h1 sx={{ mx: 2, mt: 5, mb: 0 }}>FANTASY FOOTBALL</Styled.h1>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <div sx={{}}>
          <Styled.h3 sx={{ my: 2, mx: 3 }}>Pick 3 Players</Styled.h3>
          <Styled.h4 sx={{ my: 2, mx: 4 }}>From 5 Matches</Styled.h4>
        </div>
        <div sx={{ mx: "auto" }} />
        {loading ? (
          <div sx={{ mx: 3 }}>
            <ReactLoading type="bars" color="red" height={35} width={35} />
          </div>
        ) : (
          <Link sx={{ mx: 2 }} to="/fantasy/current/">
            <button
              sx={{
                cursor: "pointer",
                appearance: "none",
                outline: "none",
                bg: "red",
                color: "white",
                border: "none",
                borderRadius: 6,
                borderBottom: "solid 4px",
                borderBottomColor: "red",
                boxShadow: "4px 4px 4px darkgrey",
                mx: 3,
                py: 2,
                px: 3,
              }}
              onClick={() => setLoading(true)}
            >
              <Styled.h2 sx={{ m: 0, textShadow: "2px 2px 2px black" }}>
                PLAY
              </Styled.h2>
            </button>
          </Link>
        )}
      </div>
      <Styled.h2 sx={{ mx: 2, mt: 5 }}>What is Silly Football?</Styled.h2>
      <Styled.p sx={{ mx: 3, fontSize: 2 }}>
        Silly Football is an online fantasy football game that covers matches
        from Premier League, La Liga, Bundesliga, Serie A and Champions League.
        Play for free against others and your friends. All you need is an
        account. Register here
      </Styled.p>
      <Styled.h2 sx={{ mx: 2, mt: 4 }}>The Rules Are Simple</Styled.h2>
      <Styled.p sx={{ mx: 3, mb: 4, fontSize: 2 }}>
        Pick any 3 players from the available matches.
        <br />
        <br />
        <FaStar /> players generate 1 point per goal or assist.
        <br />
        <br />
        All other players generate 1.5 points per goal or assist.
        <br />
        <br />
        Get the highest score to win.
      </Styled.p>
      {loading ? (
        <div sx={{ mx: 3 }}>
          <ReactLoading type="bars" color="red" height={35} width={35} />
        </div>
      ) : (
        <Link sx={{}} to="/fantasy/current/">
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "red",
              color: "white",
              border: "none",
              borderRadius: 6,
              borderBottom: "solid 4px",
              borderBottomColor: "red",
              boxShadow: "4px 4px 4px darkgrey",
              mx: 3,
              py: 2,
              px: 3,
            }}
            onClick={() => setLoading(true)}
          >
            <Styled.h2 sx={{ m: 0, textShadow: "2px 2px 2px black" }}>
              PLAY NOW
            </Styled.h2>
          </button>
        </Link>
      )}
      <div sx={{ my: 5, height: 20 }} />
    </Layout>
  )
}

export default IndexPage
