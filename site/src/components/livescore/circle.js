/** @jsx jsx */
import { jsx } from "theme-ui"

const Circle = ({ color }) => {
  return (
    <div
      sx={{
        height: 10,
        width: 10,
        color: color,
        bg: color,
        borderRadius: 9999,
      }}
    />
  )
}

export default Circle
