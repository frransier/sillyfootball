import React from "react"
import { Box } from "rebass"
import Header from "./header"
import Nav from "./nav"

const Layout = ({ children }) => {
  return (
    <>
      <Box mx="auto" maxWidth={960} p={1}>
        <Header />
        <Nav />
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout
