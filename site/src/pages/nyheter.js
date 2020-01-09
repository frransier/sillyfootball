/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import News from "../components/news/news"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import Footer from "../components/footer"
import Nav from "../components/nav"
const NewsPage = ({ data }) => {
  const news = mapEdgesToNodes(data.news)
  return (
    <Layout>
      <SEO title="Nyheter" />
      <Nav></Nav>
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 3,
        }}
      >
        <Styled.h1
          sx={{ borderBottom: "solid 2px", borderBottomColor: "primary" }}
        >
          Fotbollsnyheter
        </Styled.h1>
        {news.map((n, index) => (
          <News key={index} content={n}></News>
        ))}
      </div>
      <Footer />
    </Layout>
  )
}

export default NewsPage

export const query = graphql`
  query NewsPageQuery {
    news: allSanityNews {
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