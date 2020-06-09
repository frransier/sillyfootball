/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Frame from "./frame"

const Button = ({ children, dispatch, fontSize, p, height, color, bg }) => {
  return (
    <Frame borderWidth={1}>
      <button
        sx={{
          height: height || 40,
          width: "100%",
          cursor: "pointer",
          appearance: "none",
          outline: "none",
          border: "none",
          bg: bg || "secondary",
          color: color || "background",
          // borderRadius: 4,
          p: p || 4
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
    </Frame>
  )
}

export default Button
