/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { serializers } from "../utils/serializers"
import Nav from "../components/nav"
import Footer from "../components/footer"
import icon from "../images/fantasy.svg"
import iconDark from "../images/fantasy-dark.svg"
import Button from "../components/button"

const WhitePaperPage = ({ data }) => {
  const [colorMode] = useColorMode()

  return (
    <Layout>
      <SEO title="Regler" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 5,
        }}
      >
        <img
          sx={{ width: 290, height: 35, mb: 6 }}
          src={colorMode === "default" ? icon : iconDark}
          alt="Fantasy Football"
        />

        <BlockContent blocks={data.page._rawBody} serializers={serializers} />
        <Button text="Spela" action="fantasy" />
      </div>
      <Footer />
    </Layout>
  )
}
export default WhitePaperPage

export const query = graphql`
  query ManifestoQuery {
    page: sanityPage(slug: { current: { eq: "regler" } }) {
      _rawBody
      title
      intro
    }
  }
`
