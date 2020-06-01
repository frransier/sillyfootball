/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({ children, dispatch, fontSize }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "red",
        color: "white",
        borderRadius: 6,
        border: "solid 2px red",
        // borderBottom: "solid 4px",
        // borderBottomColor: "red",
        boxShadow: "4px 4px 4px darkgrey",
        py: 0,
        px: 3,
        my: 3
      }}
      onClick={dispatch}
    >
      <Styled.h1
        sx={{ my: 1, fontSize: fontSize, textShadow: "3px 3px 0px  black" }}
      >
        {children}
      </Styled.h1>
    </button>
  )
}

export default Button
