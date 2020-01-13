/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
/** @jsx jsx */
import { jsx } from "theme-ui"
import Header from "./header"
import { Global, css } from "@emotion/core"

const Layout = ({ children }) => {
  return (
    <div sx={{ mx: "auto", maxWidth: 500 }}>
      <Global
        styles={css`
          html {
            overflow-y: scroll;
          }
        `}
      />
      <Header />

      <div sx={{ width: ["100%"], mx: "auto" }}>{children}</div>
    </div>
  )
}

export default Layout
