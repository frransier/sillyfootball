import React from "react"
import { connectMenu } from "react-instantsearch-dom"
import { Flex, Box, Text } from "rebass"
import { useStaticQuery, graphql } from "gatsby"
import { mapEdgesToNodes } from "../helpers"
import { motion } from "framer-motion"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"

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

      if (teams.length > 0) {
        const homeTeam = teams.find(x => x.active)
        const awayTeam = teams.find(x => !x.active)

        return { ...i, homeTeam, awayTeam }
      }
      return null
    })
    .sort((a, b) => a.label - b.label)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        stiffness: 200,
      }}
    >
      <Flex width={1} flexWrap="wrap" sx={{ fontFamily: "body" }}>
        {schema.map(item => {
          console.log(item)

          if (item) {
            return (
              <Flex
                bg={item.isRefined && "primary"}
                p={[1, 1]}
                width={1 / 2}
                sx={{
                  borderRadius: 3,
                }}
                onClick={event => {
                  event.preventDefault()
                  refine(item.isRefined ? null : item.homeTeam.index)
                }}
                key={item.label}
              >
                <Box width="100%" css={{ cursor: "pointer" }}>
                  <Box sx={{ borderRadius: 6 }}>
                    <Flex>
                      <Box>
                        {item.isRefined ? (
                          <IoIosArrowDown color="white" />
                        ) : (
                          <IoIosArrowForward />
                        )}
                      </Box>
                      <Box
                        width="85%"
                        mx="auto"
                        sx={{
                          borderWidth: "0px 0px 2px 0px",
                          borderStyle: "solid",
                          borderColor: item.isRefined ? "white" : "primary",
                        }}
                      >
                        <Text
                          color={item.isRefined ? "black" : ""}
                          fontSize={[1, 2]}
                          fontFamily="heading"
                        >
                          {`${item.homeTeam.nickName} - ${item.awayTeam.nickName}`}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            )
          }
          return null
        })}
      </Flex>
    </motion.div>
  )
}

export default connectMenu(Matches)
