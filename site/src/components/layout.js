/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
