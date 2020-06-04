/** @jsx jsx */
import { jsx } from "theme-ui"
import Frame from "../atoms/frame"
import Container from "../atoms/container"

const Board = ({ children }) => (
  <Container>
    <Frame borderWidth={2} borderRadius={3} columns="1fr 1fr 1fr">
      {children}
    </Frame>
  </Container>
)

export default Board
