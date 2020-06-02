/** @jsx jsx */
import { jsx } from "theme-ui"

const Board = ({ children }) => (
  <div
    sx={{
      display: "grid",

      gridTemplateColumns: "33% 34% 33%",
      alignItems: "center",
      justifyItems: "center",
      border: "solid 1px",
      borderColor: "primary",
      boxShadow: "0px 2px 5px darkgrey"
    }}
  >
    {children}
  </div>
)

export default Board
