/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const AltButton = ({ children, dispatch, fontSize }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "red",
        color: "white",
        border: "solid 1px black",
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
      <Styled.h1 sx={{ my: 1, fontSize: fontSize }}>{children}</Styled.h1>
    </button>
  )
}

export default AltButton
