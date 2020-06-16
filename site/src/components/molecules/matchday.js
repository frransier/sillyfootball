/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { navigate, Link } from "gatsby"
import Button from "../atoms/button"
import Container from "../atoms/container"
import Ticket from "./ticket"
import Heading from "./heading"
import { Fragment } from "react"

const Matchday = ({ matchday, status, deadline }) => {
  function Play() {
    navigate("/fantasy/")
  }
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
          <Button dispatch={() => Play()}>PLAY NOW</Button>
        </Container>
      )}
      {matchday.length !== 0 && (
        <Container mt={2}>
          {matchday
            .sort((a, b) => (a.score < b.score ? 1 : -1))
            .map((x, i) => (
              <Ticket key={i} ticket={x} index={i} />
            ))}
          {status === "Upcoming" && (
            <div
              sx={{
                // display: "flex",
                // alignItems: "center",
                mt: 3,
                textAlign: "right"
              }}
            >
              {/* <div sx={{ mx: "auto" }} /> */}
              <Styled.p sx={{ m: 2 }}>Need to make changes?</Styled.p>
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
