/** @jsx jsx */
import { jsx } from "theme-ui"

const Matches = ({ children }) => (
  <div
    sx={{
      display: "grid",
      gridTemplateColumns: "50% 50%",
      alignItems: "center",
      justifyItems: "center",
      columnGap: 3,
      mx: 3,
      px: 1
      // height: 150
    }}
  >
    {children}
  </div>
)

export default Matches
