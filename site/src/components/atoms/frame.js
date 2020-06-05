/** @jsx jsx */
import { jsx } from "theme-ui"

const Frame = ({
  children,
  my,
  ml,
  borderRadius,
  borderWidth,
  width,
  bg,
  columns
}) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        boxShadow: "2px 2px 6px darkgrey",
        border: "solid",
        borderColor: "secondary",
        bg: bg || "background",
        my: my,
        ml: ml,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        // p: borderWidth - 1,
        width: width,
        gridTemplateColumns: columns
      }}
    >
      {children}
    </div>
  )
}

export default Frame
