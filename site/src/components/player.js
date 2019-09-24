import React from "react"
//import { useDispatchContext, useStateContext } from "../context/context"
import { Box, Flex, Image, Text, Card } from "rebass"
import { FaPlus } from "react-icons/fa"
import { useDispatchContext, useStateContext } from "../state"
import { useToast } from "sancho"

const Player = props => {
  const dispatch = useDispatchContext()
  const state = useStateContext()
  const toast = useToast()
  //   const state = useStateContext()
  //   const toast = useToast()
  const hit = props.hit
  const team = props.hit.team

  //   const opacity = 1 / props.index
  //   const ginit = (hit.goals * hit.pp90) / (hit.goals + hit.assists)
  //   const ainit = (hit.assists * hit.pp90) / (hit.goals + hit.assists)
  //   const gp90 = Math.round(100 * ginit) / 100 || 0
  //   const ap90 = Math.round(100 * ainit) / 100 || 0

  return (
    <>
      <Flex height="70px">
        <Card mx="auto" my={1} width="80%" sx={{ borderRadius: 10 }}>
          <Flex>
            <Card width="85%">
              <Flex>
                <Box>
                  <Image width="40px" src={team.logo.asset.url}></Image>
                </Box>
                <Box ml={2} width={8 / 8}>
                  <Text textAlign="left" mt={1} ml={2} fontSize={2}>
                    {hit.name}
                  </Text>
                </Box>
                <Box mt={1} mr={2}>
                  <Text textAlign="center">{hit.points}p</Text>
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex
                onClick={() => (
                  state.filter(x => x.name === hit.name).length > 0
                    ? toast({
                        title: `${hit.name} är redan med i ditt lag`,
                        position: "top",
                        intent: "danger",
                        duration: 1000,
                        // eslint-disable-next-line
                      })
                    : toast({
                        title: `${hit.name} lades till i ditt lag`,
                        position: "top",
                        intent: "success",
                        duration: 1000,
                        // eslint-disable-next-line
                      }),
                  dispatch({
                    type: "add",
                    hit,
                  })
                )}
              >
                <Box color="primary" mt={1} mx={1}>
                  <FaPlus size={20} />
                </Box>
              </Flex>
            </Card>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default Player
