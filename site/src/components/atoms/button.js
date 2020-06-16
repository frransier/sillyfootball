/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({
  children,
  dispatch,
  fontSize,
  p,
  height,
  width,
  color,
  bg
}) => {
  return (
    <button
      sx={{
        height: height || 40,
        width: width || "100%",
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        border: "none",
        bg: bg || "secondary",
        color: color || "background",
        // borderRadius: 4,
        p: p || 4,
        px: 5
      }}
      onClick={dispatch}
    >
      <Styled.h1
        sx={{
          m: 0,
          fontSize: fontSize
        }}
      >
        {children}
      </Styled.h1>
    </button>
  )
}

export default Button
