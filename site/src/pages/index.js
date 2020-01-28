/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import News from "../components/index/news"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { mapEdgesToNodes } from "../utils/mapEdgesToNodes"
import Footer from "../components/footer"
import Main from "../components/index/main"
import Card from "../components/index/card"
import { GiMining, GiDiamondHard } from "react-icons/gi"

const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
]
const weekdays = [
  "Söndag",
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
]

const IndexPage = props => {
  const news = mapEdgesToNodes(props.data.news)

  const date = new Date(props.data.matchday.start)
  const minutes = date.getMinutes() === 0 ? "00" : `${date.getMinutes()}`
  const hours = `${date.getHours()}`
  const day = `${date.getDate()}`
  const weekday = weekdays[date.getDay()]
  const month = months[date.getMonth()]
  const deadline = `${weekday} ${day} ${month} kl ${hours}:${minutes}`

  return (
    <Layout>
      <SEO title="Fotboll, Nyheter, Fantasy, Livescore" />
      <div
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Main deadline={deadline} />
      </div>
      {news.map((content, index) => (
        <News key={index} content={content} />
      ))}
      <div
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          icon={<GiMining />}
          title="Easy to learn"
          body1="Välj 5 spelare."
          body2="1p per mål/assist."
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
