/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
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
          // cta="Spela"
          action="fantasy"
        />
        <Card
          icon={<GiDiamondHard />}
          title="Hard to master"
          body1="Bli ensam vinnare."
          body2="Vinn 500 kronor."
          // cta="Läs mer"
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
    matchday: sanityMatchday(status: { eq: "current" }) {
      start
      prize
    }
  }
`
