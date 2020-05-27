/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({ children, dispatch }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "red",
        color: "white",
        border: "solid 6px white",
        borderRadius: 6,
        // borderBottom: "solid 4px",
        // borderBottomColor: "red",
        boxShadow: "4px 4px 4px darkgrey",
        py: 0,
        px: 3,
        my: 3
      }}
      onClick={dispatch}
    >
      <Styled.h2 sx={{ my: 1, textShadow: "1.5px 1.5px 1.5px black" }}>
        {children}
      </Styled.h2>
    </button>
  )
}

export default Button
