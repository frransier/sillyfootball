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
        border: "solid 0.5px black",
        // borderBottom: "solid 4px",
        // borderBottomColor: "red",
        boxShadow: "2px 2px 7px darkgrey",
        py: 1,
        px: 3,
        my: 3
      }}
      onClick={dispatch}
    >
      <Styled.h1
        sx={{ my: 1, fontSize: fontSize, textShadow: "2px 2px 9px  black" }}
      >
        {children}
      </Styled.h1>
    </button>
  )
}

export default Button
