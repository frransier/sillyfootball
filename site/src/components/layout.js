/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div
      sx={{
        maxWidth: "100%",
        minHeight: "100vh"
      }}
    >
      <main sx={{ mx: "auto", maxWidth: 700, px: 2, py: 3 }}>
        <Header />
        {children}
        <Header />
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
