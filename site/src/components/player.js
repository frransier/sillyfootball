import React from "react"
import { Box, Flex, Image, Text } from "rebass"
import { FaRegHeart, FaRegThumbsUp } from "react-icons/fa"

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
      <Flex>
        <Flex
          sx={{
            borderWidth: "0px 0px 1px 0px",
            borderStyle: "dotted",
            fontFamily: `body`,
          }}
          width={[3 / 4, 1]}
          mx="auto"
        >
          <Box mx={2} width={1}>
            <Flex alignItems="center" justifyContent="center">
              <Box>
                <Image
                  width="20px"
                  mt={1}
                  src={team.logo.asset.url}
                  alt={team.name}
                ></Image>
              </Box>
              <Box ml={2} width={1}>
                <Text
                  textAlign="left"
                  fontSize={3}
                  fontWeight={
                    state.filter(x => x.name === hit.name).length > 0
                      ? "bold"
                      : "normal"
                  }
                >
                  {hit.name}
                </Text>
              </Box>
              <Box>
                <Text textAlign="center">{hit.points}p</Text>
              </Box>
              <Box
                ml={3}
                pt="5px"
                color="primary"
                onClick={() =>
                  state.filter(x => x.name === hit.name).length > 0
                    ? toast({
                        title: `${hit.name} är redan med i ditt lag`,
                        position: "top",
                        intent: "danger",
                        duration: 1000,
                        // eslint-disable-next-line
                      })
                    : (toast({
                        title: `${hit.name} lades till i ditt lag`,
                        position: "top",
                        intent: "success",
                        duration: 1000,
                        // eslint-disable-next-line
                      }),
                      dispatch({
                        type: "add",
                        hit,
                      }))
                }
              >
                {state.filter(x => x.name === hit.name).length > 0 ? (
                  <FaRegThumbsUp color="black" size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Player
