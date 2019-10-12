import React from "react"
import { Box } from "rebass"
import Header from "./header"
import Intercom from "react-intercom"

const Layout = ({ children }) => {
  return (
    <>
      <Intercom appId="entknhmw" />
      <Box mx="auto" maxWidth={960} p={1}>
        <Header />
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout
