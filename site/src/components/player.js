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
      <Flex>
        <Card mx="auto" my={2} width="75%" sx={{ borderRadius: 10 }}>
          <Flex>
            <Box>
              <Image width="40px" src={team.logo.asset.url}></Image>
            </Box>
            <Box ml={2} width={6 / 8}>
              <Text textAlign="left" mt={1} fontSize={4}>
                {hit.name}
              </Text>
            </Box>
            <Box mt={2}>
              <Text textAlign="center">{hit.points}p</Text>
            </Box>
          </Flex>
        </Card>
        <Box
          onClick={() => (
            state.filter(x => x.name === hit.name).length > 0
              ? toast({
                  title: `${hit.name} är redan med i ditt lag`,
                  position: "bottom",
                  intent: "danger",
                  duration: 1000,
                  // eslint-disable-next-line
                })
              : toast({
                  title: `${hit.name} lades till i ditt lag`,
                  position: "bottom",
                  intent: "success",
                  duration: 1000,
                  // eslint-disable-next-line
                }),
            dispatch({
              type: "add",
              hit,
            })
          )}
          color="primary"
          mt="19px"
        >
          <FaPlus size={30} />
        </Box>
      </Flex>
    </>
  )
}

export default Player
