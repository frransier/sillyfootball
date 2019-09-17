import React from "react"
import { connectMenu } from "react-instantsearch-dom"
import { Flex, Box, Text, Card } from "rebass"
import { useStaticQuery, graphql } from "gatsby"
import { mapEdgesToNodes } from "../helpers"

const Matches = ({ items, refine }) => {
  const site = useStaticQuery(
    graphql`
      query SchemaQuery {
        teams: allSanityTeam(filter: { index: { ne: null } }) {
          edges {
            node {
              index
              active
              nickName
              logo {
                asset {
                  url
                }
              }
            }
          }
        }
      }
    `
  )
  const rawTeams = mapEdgesToNodes(site.teams)

  const schema = items
    .map(i => {
      const teams = rawTeams.filter(
        x => x.index.toString() === i.value.toString()
      )

      const homeTeam = teams.find(x => x.active)
      const awayTeam = teams.find(x => !x.active)

      return { ...i, homeTeam, awayTeam }
    })
    .sort((a, b) => a.label - b.label)

  return (
    <Flex flexWrap="wrap" width={375}>
      {schema.map((item, index) => {
        return (
          <Flex
            width="44%"
            onClick={event => {
              event.preventDefault()
              refine(item.isRefined ? null : item.homeTeam.index)
            }}
            key={item.label}
          >
            <Box width="100%" ml={3}>
              <Card textAlign="center" sx={{ borderRadius: 6 }}>
                <Text color={item.isRefined ? "primary" : ""} fontSize={0}>
                  {`${item.homeTeam.nickName} - ${item.awayTeam.nickName}`}
                </Text>
              </Card>
            </Box>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default connectMenu(Matches)
