/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({ children, dispatch, fontSize }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "secondary",
        // color: "white",
        borderRadius: 0,
        // border: "solid 1px #596275",
        // borderBottom: "solid 4px",
        // borderBottomColor: "red",
        // boxShadow: "2px 2px 4px #596275",
        py: 1,
        px: 3,
        my: 3
        // opacity: 0.7
      }}
      onClick={dispatch}
    >
      <Styled.h1
        sx={{
          my: 1,
          fontSize: fontSize,
          color: "primary",
          textShadow: "1px 1px 3px black"
        }}
      >
        {children}
      </Styled.h1>
    </button>
  )
}

export default Button
