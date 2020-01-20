/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
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
const IndexPage = props => {
  const [colorMode] = useColorMode()
  const news = mapEdgesToNodes(props.data.news)

  return (
    <Layout>
      <SEO title="Fotboll, Nyheter, Fantasy, Livescore" />
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
              width: 290,
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
              body1="Välj 5 spelare."
              body2="1 poäng per mål/assist."
              cta="Spela"
              action="fantasy"
            />
            <Card
              icon={<GiDiamondHard />}
              title="Hard to master"
              body1="Bli ensam vinnare."
              body2="Vinn 500 kronor."
              cta="Läs mer"
              action="white-paper"
            />
          </div>
        </div>
      </div>

      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "100%",
          alignItems: "center",
        }}
      >
        <div sx={{ mx: 0 }}>
          {news.map((content, index) => (
            <News key={index} content={content} />
          ))}
        </div>
      </div>

      <Footer />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    news: allSanityNews(sort: { fields: sort, order: DESC }) {
      edges {
        node {
          _createdAt
          _updatedAt
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
              fixed(width: 100, height: 75) {
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
    }
  }
`
