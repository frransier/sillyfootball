/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import News from "../components/news/news"
import Nav from "../components/nav"
import Footer from "../components/footer"

export const query = graphql`
  query TagQuery($id: String!) {
    tag: sanityTag(id: { eq: $id }) {
      title
      slug {
        current
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

const TagTemplate = ({ data }) => {
  const tag = data && data.tag
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
        <Styled.h1>Nyheter {tag.title}</Styled.h1>
        {allNews.edges.map(({ node }, index) => (
          <News key={index} content={node}></News>
        ))}
      </div>
      <Footer />
    </Layout>
  )
}

export default TagTemplate
