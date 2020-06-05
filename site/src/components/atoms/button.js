/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Frame from "./frame"

const Button = ({ children, dispatch, fontSize }) => {
  return (
    <Frame borderWidth={2} borderRadius={6}>
      <button
        sx={{
          height: 40,
          cursor: "pointer",
          appearance: "none",
          outline: "none",
          border: "none",
          bg: "secondary",
          color: "background",
          borderRadius: 4,
          py: 4,
          px: 4
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
