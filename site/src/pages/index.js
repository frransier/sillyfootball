/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Hero from "../components/index/hero"
import News from "../components/index/news"
import Card from "../components/index/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import { useColorMode } from "theme-ui"
import fantasy from "../images/fantasy.svg"
import fantasyDark from "../images/fantasy-dark.svg"
import { GiMining, GiDiamondHard } from "react-icons/gi"
import Footer from "../components/footer"
import Nav from "../components/nav"
const IndexPage = props => {
  const [colorMode] = useColorMode()
  const news = mapEdgesToNodes(props.data.news)

  return (
    <Layout>
      <SEO title="Fotboll | Nyheter | Fantasy | Livescore" />
      <Nav />
      <Hero content={news[0]} />
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["100%", "55% 45%"],
        }}
      >
        <div sx={{ mr: 3 }}>
          {news.map(
            (content, index) =>
              index > 0 && <News key={index} content={content} />
          )}
        </div>

        <div sx={{ display: "grid", gridTemplateColumns: "100%" }}>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
          </div>
          <div
            sx={{ display: "grid", gridTemplateColumns: "50% 50%", mx: "auto" }}
          >
            <Card
              icon={<GiMining />}
              title="Easy to learn"
              body="Välj 5 spelare från 10 matcher. Få 1 poäng per mål/assist."
              cta="Så funkar det"
              slug="/white-paper/"
            />
            <Card
              icon={<GiDiamondHard />}
              title="Hard to master"
              body="Bli ensam vinnare och ta hem 500 friska kronor."
              cta="Spela nu"
              slug="/fantasy/"
            />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
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
          image {
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
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
    matchday: sanityMatchday(status: { eq: "current" }) {
      start
      prize
      jackpot
    }
  }
`
