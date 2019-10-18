import React from "react"
import { Box } from "rebass"
import Header from "./header"
import { Global, css } from "@emotion/core"

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          html {
            overflow-y: scroll;
          }
        `}
      />
      <Box mx="auto" maxWidth={960} p={1}>
        <Header />
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout
