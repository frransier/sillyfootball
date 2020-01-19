/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import News from "../components/news/news"
import Nav from "../components/nav"
import Footer from "../components/footer"
import Card from "../components/index/card"
import { GiMining, GiDiamondHard } from "react-icons/gi"
import fantasy from "../images/fantasy.svg"
import fantasyDark from "../images/fantasy-dark.svg"
export const query = graphql`
  query TagQuery($id: String!) {
    tag: sanityTag(id: { eq: $id }) {
      title
      slug {
        current
      }
    }
    allNews: allSanityNews(sort: { fields: sort, order: DESC }) {
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
              fixed(width: 100, height: 75) {
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
  const [colorMode] = useColorMode()
  const tag = data && data.tag
  const allNews = data && data.allNews

  return (
    <Layout>
      <SEO title={`Nyheter ${tag.title}`} />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Styled.h1>Nyheter {tag.title}</Styled.h1>
        {allNews.edges.map(({ node }, index) => (
          <News key={index} content={node}></News>
        ))}
      </div>
      <div
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          sx={{
            display: "grid",
            width: "100%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <img
            sx={{
              width: 250,
              height: 35,
            }}
            src={colorMode === "default" ? fantasy : fantasyDark}
            alt="Fantasy Football"
          />
          <div
            sx={{ display: "grid", gridTemplateColumns: "50% 50%", mx: "auto" }}
          >
            <Card
              icon={<GiMining />}
              title="Easy to learn"
              body="Välj 5 spelare från 10 matcher. Få 1 poäng per mål/assist."
              cta="Spela"
              action="fantasy"
            />
            <Card
              icon={<GiDiamondHard />}
              title="Hard to master"
              body="Bli ensam vinnare och plocka hem 500 kronor."
              cta="Läs mer"
              action="white-paper"
            />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default TagTemplate
