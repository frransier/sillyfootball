/** @jsx jsx */
import { jsx } from "theme-ui"
import Frame from "../atoms/frame"
import Container from "../atoms/container"

const Board = ({ children }) => (
  <Container columns="1fr 1fr 1fr">
    {/* <Frame borderWidth={1} borderRadius={3} columns="1fr 1fr 1fr"> */}
    {children}
    {/* </Frame> */}
  </Container>
)

export default Board
