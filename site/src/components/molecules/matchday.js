/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { navigate, Link } from "gatsby"
import Button from "../atoms/button"
import Container from "../atoms/container"
import Ticket from "./ticket"
import Heading from "./heading"
import { Fragment } from "react"

const Matchday = ({ matchday, status, deadline, dispatch, live }) => {
  return (
    <Fragment>
      <Heading
        main={status}
        sub3={deadline}
        columns={["40% 20% 40%"]}
        // justify="center"
      />

      {matchday.length === 0 && (
        <Container>
          <Button dispatch={() => navigate("/fantasy/")}>PLAY NOW</Button>
        </Container>
      )}
      {matchday.length !== 0 && (
        <Container mt={2}>
          {matchday.map((x, i) => (
            <Ticket key={i} ticket={x} index={i} disabled={live} />
          ))}
          {status === "Current Round" && (
            <div
              sx={{
                display: "flex",
                alignItems: "start",
                mt: 3,
                textAlign: "right"
              }}
            >
              <button
                onClick={dispatch}
                sx={{
                  appearance: "none",
                  outline: "none",
                  bg: "background",
                  border: "none",
                  p: 0
                }}
              >
                <Styled.h6 sx={{ m: 2, color: "muted", fontWeight: "heading" }}>
                  Show Previous Round
                </Styled.h6>
              </button>
              <div sx={{ mx: "auto" }} />
              <div>
                <Styled.p sx={{ m: 2 }}>Need to make changes?</Styled.p>
                <Link to="/fantasy/" sx={{ textDecoration: "none" }}>
                  <Styled.h6 sx={{ m: 2, color: "red", fontWeight: "heading" }}>
                    Play Again >
                  </Styled.h6>
                </Link>
              </div>
            </div>
          )}
        </Container>
      )}
    </Fragment>
  )
}

export default Matchday
