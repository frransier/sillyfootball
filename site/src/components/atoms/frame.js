/** @jsx jsx */
import { jsx } from "theme-ui"

const Frame = ({
  children,
  my,
  ml,
  mr,
  borderRadius,
  borderWidth,
  width,
  height,
  bg,
  columns
}) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        boxShadow: "1px 1px 4px darkgrey",
        border: "solid",
        borderColor: "secondary",
        bg: bg || "background",
        my: my,
        ml: ml,
        mr: mr,
        // p: p,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        p: borderWidth - 1,
        width: width,
        height: height,
        gridTemplateColumns: columns
      }}
    >
      {children}
    </div>
  )
}

export default Frame
