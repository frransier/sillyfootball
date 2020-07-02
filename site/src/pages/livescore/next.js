/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import LiveMatch from "../../components/molecules/liveMatch"
import Heading from "../../components/molecules/heading"
import Loading from "../../components/molecules/loading"
import { useGlobalState } from "../../state"
import Container from "../../components/atoms/container"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: true
})

const NextLivescorePage = ({ data }) => {
  const [livescore, setLivescore] = useState(null)
  const state = useGlobalState()

  useEffect(() => {
    if (livescore) setLivescore(null)
    Livescore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  async function Livescore() {
    const matchesQuery = `*[_type == 'match' &&
          matchday->status == "next"]
          {
            matchday->{title, deadline},
            home->{
              _id,
              name,
              fullName
            },
            away->{
              _id,
              name,
              fullName
            },
            homeGoals,
            awayGoals,
            elapsed,
            status,
            start,
            events[]{
              goal,
              assist,
              elapsed,
              detail,
              team->{
                _id
              }
            },
          }| order(start asc)`
    const match = await client.fetch(matchesQuery)
    setLivescore({ matches: match })
  }

  return (
    <Layout>
      <SEO title="Livescore" />
      {!livescore && <Loading />}
      {livescore && (
        <Container>
          <Heading
            main={livescore.matches[0].matchday.title}
            sub1={data.matchday.deadline}
            columns="50% 50%"
          />

          <Container mt={4}>
            {livescore.matches.map((x, i) => (
              <LiveMatch key={i} match={x} />
            ))}
            <Link
              to="/livescore/"
              sx={{ textDecoration: "none", color: "red", my: 4 }}
            >
              <Styled.p>{`< Current Round`}</Styled.p>
            </Link>
          </Container>
        </Container>
      )}
    </Layout>
  )
}

export default NextLivescorePage

export const query = graphql`
  query NextLivescoreQuery {
    matchday: sanityMatchday(status: { eq: "next" }) {
      deadline(formatString: "dddd MMMM Do")
      start: deadline
    }
  }
`
