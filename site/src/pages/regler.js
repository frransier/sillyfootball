/** @jsx jsx */
import { jsx } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { serializers } from "../utils/serializers"
import Footer from "../components/footer"
import Button from "../components/button"

const WhitePaperPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Regler" />
      <div
        sx={{
          display: "grid",
          // alignItems: "center",
          justifyItems: "center",
          mx: 5,
        }}
      >
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
