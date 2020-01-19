/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import News from "../components/news/news"
import BlockContent from "@sanity/block-content-to-react"
import Nav from "../components/nav"
import Footer from "../components/footer"
import Card from "../components/index/card"
import { serializers } from "../utils/serializers"
import { GiMining, GiDiamondHard } from "react-icons/gi"
import fantasy from "../images/fantasy.svg"
import fantasyDark from "../images/fantasy-dark.svg"
import { Divider } from "@theme-ui/components"

const NewsTemplate = ({ data }) => {
  const [colorMode] = useColorMode()
  const news = data && data.news
  const allNews = data && data.allNews
  const date = new Date(news._updatedAt)

  const datestring = date.toLocaleDateString("sv-SV")

  return (
    <Layout>
      <SEO
        title={news.title}
        description={news.intro}
        image={news.image.asset.fluid.src}
      />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Styled.h1 sx={{ justifySelf: "start", mb: 2, mx: 3 }}>
          {news.title}
        </Styled.h1>
        <Styled.h3 sx={{ my: 0, justifySelf: "start", mx: 3 }}>
          {datestring}
        </Styled.h3>

        <Image sx={{ width: "98%" }} fluid={news.image.asset.fluid} />

        <Styled.h2 sx={{ mx: 3, justifySelf: "start" }}>{news.intro}</Styled.h2>
        <BlockContent
          sx={{ mx: 3 }}
          blocks={news._rawBody}
          serializers={serializers}
        />
        <a
          sx={{ justifySelf: "end" }}
          style={{ textDecoration: "none" }}
          href={news.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Styled.h2
            sx={{
              justifySelf: "end",
              mx: 4,
              color: "text",
              textDecoration: "underline",
            }}
          >
            Källa
          </Styled.h2>
        </a>
        <Divider></Divider>
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
              sx={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
                mx: "auto",
              }}
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
        <Divider></Divider>
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
      source
      _rawBody(resolveReferences: { maxDepth: 10 })
      image {
        asset {
          fluid {
            src
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
