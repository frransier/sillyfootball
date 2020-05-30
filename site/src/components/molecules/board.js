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
      borderBottom: "none",
      borderRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      pt: 2
      // boxShadow: "0px 2px 2px darkgrey"
    }}
  >
    {children}
  </div>
)

export default Board