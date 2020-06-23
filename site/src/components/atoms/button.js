/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({
  children,
  dispatch,
  disable,
  fontSize,
  p,
  height,
  width,
  color,
  noShadow,
  bg
}) => {
  return (
    <button
      disabled={disable}
      sx={{
        height: height || 40,
        width: width || "100%",
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        border: "none",
        bg: disable ? "background" : bg || "secondary",
        color: disable ? "muted" : color || "background",
        boxShadow: noShadow ? "none" : "1px 1px 4px darkgrey",
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
