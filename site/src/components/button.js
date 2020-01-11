/** @jsx jsx */
import { jsx } from "theme-ui"

const Button = ({ text, action }) => {
  return (
    <button
      sx={{
        fontSize: 5,
        my: 7,
        px: 6,
        py: 4,
        bg: "background",
        border: "solid 1px",
        borderColor: "primary",
        color: "text",
        borderRadius: 8,
        fontFamily: "heading",
        fontWeight: "heading",
        appearance: "none",
      }}
    >
      {text}
    </button>
  )
}

export default Button
