/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import News from "../components/news/news"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import Footer from "../components/footer"
import Nav from "../components/nav"
import newsImg from "../images/news.svg"
import newsDark from "../images/news-dark.svg"
import Card from "../components/index/card"
import { GiMining, GiDiamondHard } from "react-icons/gi"
import fantasy from "../images/fantasy.svg"
import fantasyDark from "../images/fantasy-dark.svg"
const NewsPage = ({ data }) => {
  const [colorMode] = useColorMode()
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
        <img
          sx={{
            width: 230,
            height: 40,
            my: 3,
          }}
          src={colorMode === "default" ? newsImg : newsDark}
          alt="Fantasy Football"
        />

        {news.map((n, index) => (
          <News key={index} content={n}></News>
        ))}
      </div>
      <div
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          sx={{
            display: "grid",
            width: ["100%", "60%"],
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
              body="Bli ensam vinnare och ta hem 500 kronor."
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
