/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const Button = ({ children, dispatch, fontSize }) => {
  return (
    <div
      sx={{
        p: "3px",
        bg: "secondary",
        borderTopLeftRadius: 3
        // transform: "rotate(1deg)"
      }}
    >
      <button
        sx={{
          cursor: "pointer",
          appearance: "none",
          outline: "none",
          bg: "background",
          color: "secondary",
          borderRadius: 0,
          border: "solid 2px",
          borderColor: "primary",
          // borderBottom: "solid 4px",
          // borderBottomColor: "red",
          // boxShadow: "2px 2px 4px #596275",
          // transform: "rotate(-0.5deg)",
          py: 0,
          px: 3
          // my: 3
          // opacity: 0.7
        }}
        onClick={dispatch}
      >
        <Styled.h1
          sx={{
            my: 1,
            fontSize: fontSize
            // transform: "rotate(0.5deg)"
            // color: "primary",
            // textShadow: "1px 1px 0px darkgrey"
          }}
        >
          {children}
        </Styled.h1>
      </button>
    </div>
  )
}

export default Button
