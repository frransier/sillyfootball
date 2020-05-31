/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { navigate } from "gatsby"
import Button from "../atoms/button"
import Container from "../atoms/container"
import Ticket from "./ticket"
import { useLoadingDispatch } from "../../state"

const Matchday = ({ matchday, status, deadline }) => {
  const loadingDispatch = useLoadingDispatch()
  function Play() {
    loadingDispatch({ type: "set", loading: true })
    navigate("/fantasy/")
  }
  return (
    <Container>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <Styled.h3
          sx={{ m: 0, color: status === "Next" ? "text" : "darkgrey" }}
        >
          {status}
        </Styled.h3>
        <div sx={{ mx: "auto" }} />
        <Styled.h6
          sx={{
            m: 0,
            fontWeight: 600,
            color: status === "Current" ? "text" : "darkgrey"
          }}
        >
          {deadline}
        </Styled.h6>
      </div>
      {matchday === "play" && <Button dispatch={() => Play()}>PLAY NOW</Button>}
      {matchday !== "play" &&
        matchday !== "no hits" &&
        matchday.map((x, i) => <Ticket key={i} ticket={x} index={i} />)}
    </Container>
  )
}

export default Matchday
