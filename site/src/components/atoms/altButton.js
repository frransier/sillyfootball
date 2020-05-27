/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

const AltButton = ({ children, dispatch }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        appearance: "none",
        outline: "none",
        bg: "white",
        // color: "azure",
        border: "solid 4px red",
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
      <Styled.h1 sx={{ my: 1 }}>{children}</Styled.h1>
    </button>
  )
}

export default AltButton
