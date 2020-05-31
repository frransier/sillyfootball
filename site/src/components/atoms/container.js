/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, columns, rows, mt }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        mt: mt || 4,
        mx: 2
      }}
    >
      {children}
    </div>
  )
}

export default Container
