/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, columns, rows, mt, mb }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        mt: mt || 6,
        mb: mb || 0,
        mx: 4
      }}
    >
      {children}
    </div>
  )
}

export default Container
