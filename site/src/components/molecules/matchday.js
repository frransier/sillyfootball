/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { navigate, Link } from "gatsby"
import Button from "../atoms/button"
import Container from "../atoms/container"
import Ticket from "./ticket"
import { useLoadingDispatch } from "../../state"
import { Fragment } from "react"

const Matchday = ({ matchday, status, deadline }) => {
  const loadingDispatch = useLoadingDispatch()
  function Play() {
    loadingDispatch({ type: "set", loading: true })
    navigate("/fantasy/")
  }
  return (
    <Fragment>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <Styled.h2
          sx={{ m: 0, color: status === "Next" ? "text" : "darkgrey" }}
        >
          {status}
        </Styled.h2>
        <div sx={{ mx: "auto" }} />
        <Styled.h6
          sx={{
            m: 0,
            fontWeight: 600,
            color: status === "Next" ? "text" : "darkgrey"
          }}
        >
          {deadline}
        </Styled.h6>
      </div>
      {matchday === "play" && (
        <Container>
          <Button dispatch={() => Play()}>PLAY NOW</Button>
        </Container>
      )}
      {matchday !== "play" && matchday !== "no hits" && (
        <Container mt={2}>
          {matchday
            .sort((a, b) => (a.score < b.score ? 1 : -1))
            .map((x, i) => (
              <Ticket key={i} ticket={x} index={i} />
            ))}
          {status === "Next" && (
            <div sx={{ display: "flex", alignItems: "center" }}>
              <Styled.h5 sx={{ m: 3 }}>Need to make changes?</Styled.h5>
              <Link to="/fantasy/" sx={{ textDecoration: "none" }}>
                <Styled.h5 sx={{ m: 2, color: "red", fontWeight: "heading" }}>
                  Play Again >
                </Styled.h5>
              </Link>
            </div>
          )}
        </Container>
      )}
    </Fragment>
  )
}

export default Matchday
