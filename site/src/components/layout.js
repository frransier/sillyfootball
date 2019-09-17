import React from "react"
import { Box } from "rebass"
import Header from "./header"

const Layout = ({ children }) => {
  return (
    <>
      <Box mx="auto" maxWidth={960} p={2}>
        <Header />
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout
