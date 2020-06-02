/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({ children, dispatch, fontSize }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "background",
        color: "secondary",
        borderRadius: 5,
        border: "solid 2px",
        borderColor: "primary",
        // borderBottom: "solid 4px",
        // borderBottomColor: "red",
        // boxShadow: "2px 2px 4px #596275",
        py: 0,
        px: 3,
        my: 3
        // opacity: 0.7
      }}
      onClick={dispatch}
    >
      <Styled.h1
        sx={{
          my: 1,
          fontSize: fontSize
          // color: "primary",
          // textShadow: "1px 1px 0px darkgrey"
        }}
      >
        {children}
      </Styled.h1>
    </button>
  )
}

export default Button
