/** @jsx jsx */
import { jsx } from "theme-ui"

const Matches = ({ children }) => (
  <div
    sx={{
      display: "grid",
      gridTemplateColumns: "50% 48%",
      alignItems: "center",
      justifyItems: "start",
      columnGap: 1,
      my: 2
      // height: 150
    }}
  >
    {children}
  </div>
)

export default Matches
