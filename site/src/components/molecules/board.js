/** @jsx jsx */
import { jsx } from "theme-ui"

const Board = ({ children }) => (
  <div
    sx={{
      mt: 4,
      p: "3px",
      bg: "secondary",
      boxShadow: "0px 2px 5px darkgrey",
      borderTopLeftRadius: 4
    }}
  >
    <div
      sx={{
        display: "grid",

        gridTemplateColumns: "1fr 1fr 1fr",
        alignItems: "center",
        justifyItems: "center",
        border: "solid 2px",
        borderColor: "primary"
      }}
    >
      {children}
    </div>
  </div>
)

export default Board
