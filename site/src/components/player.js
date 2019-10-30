import React from "react"
import { Box, Image, Text } from "rebass"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { TableCell, TableRow } from "sancho"

import { useDispatchContext, useStateContext } from "../state"

const Player = props => {
  const dispatch = useDispatchContext()
  const state = useStateContext()

  const hit = props.hit
  const team = props.hit.team

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" align="center">
          <Image
            width="30px"
            mt={1}
            src={team.logo.asset.url}
            alt={team.name}
          ></Image>
        </TableCell>
        <TableCell align="left">
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
        </TableCell>
        <TableCell align="center">{hit.goals}</TableCell>
        <TableCell align="center">{hit.assists}</TableCell>
        <TableCell align="center">
          <Box
            pt={1}
            color="black"
            onClick={() =>
              state.filter(x => x.name === hit.name).length < 1 &&
              dispatch({
                type: "add",
                hit,
              })
            }
          >
            {state.filter(x => x.name === hit.name).length > 0 ? (
              <FaHeart color="tomato" size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
          </Box>
        </TableCell>
      </TableRow>
      {/* <Flex>
        <Flex
          sx={{
            borderWidth: "0px 0px 1px 0px",
            borderStyle: "dotted",
            fontFamily: `body`,
          }}
          width={[7 / 10, 1]}
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
                <Text fontSize={3} textAlign="center">
                  {hit.points}p
                </Text>
              </Box>
              <Box
                color="primary"
                onClick={() =>
                  state.filter(x => x.name === hit.name).length < 1 &&
                  dispatch({
                    type: "add",
                    hit,
                  })
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
      </Flex> */}
    </>
  )
}

export default Player
