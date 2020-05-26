/** @jsx jsx */
import { jsx } from "theme-ui"

const Matches = ({ children }) => (
  <div
    sx={{
      display: "grid",
      gridTemplateColumns: "49% 49%",
      alignItems: "center",
      justifyItems: "start",
      columnGap: 1,
      rowGap: 1,
      my: 4,
      height: 150,
    }}
  >
    {children}
  </div>
)

export default Matches
