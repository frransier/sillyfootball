/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { navigate } from "gatsby"
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
              <Styled.h5>Need to make changes?</Styled.h5>
              <div sx={{ mx: "auto" }} />
              <Button fontSize={3} p={3} dispatch={() => Play()}>
                PLAY AGAIN
              </Button>
            </div>
          )}
        </Container>
      )}
    </Fragment>
  )
}

export default Matchday
