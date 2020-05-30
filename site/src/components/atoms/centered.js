/** @jsx jsx */
import { jsx } from "theme-ui"

const Centered = ({ children, height }) => {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height
      }}
    >
      {children}
    </div>
  )
}

export default Centered
