/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { serializers } from "../utils/serializers"
import Nav from "../components/nav"
import Footer from "../components/footer"
import { Link } from "gatsby"
import icon from "../images/fantasy.svg"
import iconDark from "../images/fantasy-dark.svg"

const WhitePaperPage = ({ data }) => {
  const [colorMode] = useColorMode()

  return (
    <Layout>
      <SEO title="Profile" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 5,
          my: 5,
        }}
      >
        <img
          sx={{ width: ["90%", "60%"], mb: 6 }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Fantasy Football"
        />

        <BlockContent blocks={data.page._rawBody} serializers={serializers} />
        <Link to="/fantasy/" style={{ textDecoration: "none" }}>
          <Styled.h1
            sx={{
              color: "text",
              borderBottom: "solid 3px",
              borderBottomColor: "primary",
              fontSize: 7,
            }}
          >
            Spela
          </Styled.h1>
        </Link>
      </div>
      <Footer />
    </Layout>
  )
}
export default WhitePaperPage

export const query = graphql`
  query ManifestoQuery {
    page: sanityPage(slug: { current: { eq: "white-paper" } }) {
      _rawBody
      title
      intro
    }
  }
`
