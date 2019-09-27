import React from "react"
import { Box, Flex, Image, Text, Card } from "rebass"
import { GoPlusSmall } from "react-icons/go"
import { IoIosCheckmark } from "react-icons/io"
import { useDispatchContext, useStateContext } from "../state"
import { useToast } from "sancho"

const Player = props => {
  const dispatch = useDispatchContext()
  const state = useStateContext()
  const toast = useToast()

  const hit = props.hit
  const team = props.hit.team

  return (
    <>
      <Flex
        width={1}
        sx={{
          mx: "auto",
          px: 2,
          py: 2,
        }}
      >
        <Flex width="100%">
          <Card mx={2} width="80%">
            <Flex>
              <Box>
                <Image width="45px" src={team.logo.asset.url}></Image>
              </Box>
              <Box ml={2} width={1}>
                <Text textAlign="left" mt={2} ml={2} fontSize={4}>
                  {hit.name}
                </Text>
              </Box>
              <Box my="auto" mr={2}>
                <Text textAlign="center">{hit.points}p</Text>
              </Box>
            </Flex>
          </Card>
          <Card mx="auto" width="18%">
            <Flex
              color="primary"
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
              <Box mx="auto" pt={0}>
                {state.filter(x => x.name === hit.name).length > 0 ? (
                  <IoIosCheckmark size={35} />
                ) : (
                  <GoPlusSmall size={35} />
                )}
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </>
  )
}

export default Player
