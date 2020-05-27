/** @jsx jsx */
import { jsx } from "theme-ui"

const Container = ({ children, columns, rows }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        mt: 4,
        mx: 2
      }}
    >
      {children}
    </div>
  )
}

export default Container
