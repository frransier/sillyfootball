/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import News from "../components/news/news"
import BlockContent from "@sanity/block-content-to-react"
import Nav from "../components/nav"
import Footer from "../components/footer"
import { serializers } from "../utils/serializers"

const NewsTemplate = ({ data }) => {
  const news = data && data.news
  const allNews = data && data.allNews

  return (
    <Layout>
      <SEO title="News" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 3,
        }}
      >
        <Styled.h1 sx={{ justifySelf: "start" }}>{news.title}</Styled.h1>
        <div
          sx={{
            width: "100%",
            border: "solid 2px",
            borderColor: "muted",
            borderRadius: 9,
          }}
        >
          <Image
            sx={{ width: "100%", borderRadius: 8 }}
            fluid={news.image.asset.fluid}
          />
        </div>
        <Styled.h2>{news.intro}</Styled.h2>
        <BlockContent blocks={news._rawBody} serializers={serializers} />
        {allNews.edges.map(({ node }, index) => (
          <News key={index} content={node} />
        ))}
      </div>

      <Footer />
    </Layout>
  )
}

export default NewsTemplate

export const query = graphql`
  query NewsQuery($id: String!) {
    news: sanityNews(id: { eq: $id }) {
      _createdAt
      _updatedAt
      title
      intro
      _rawBody(resolveReferences: { maxDepth: 10 })
      image {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      tags {
        slug {
          current
        }
        title
      }
    }
    allNews: allSanityNews {
      edges {
        node {
          _createdAt
          title
          intro
          tags {
            title
            slug {
              current
            }
          }
          slug {
            current
          }
          thumbnail: image {
            asset {
              fixed(width: 110, height: 80) {
                ...GatsbySanityImageFixed
              }
            }
          }
        }
      }
    }
  }
`
