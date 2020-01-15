/** @jsx jsx */
import { jsx } from "theme-ui"
import Image from "gatsby-image"
import { FaStar, FaRegStar } from "react-icons/fa"
import { useGameDispatch, useGameState } from "../../state"
import { motion } from "framer-motion"

const Players = ({ players, logos }) => {
  const gameDispatch = useGameDispatch()
  const gameState = useGameState()
  function getLogo(teamId) {
    const logo = logos.find(x => x._id === teamId)
    return logo.logo.asset.fluid
  }
  function toggleSelected(x, selected, img) {
    if (selected) {
      gameDispatch({ type: "remove", player: x._id })
    } else {
      gameDispatch({
        type: "add",
        player: x,
        img: img,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.4,
      }}
    >
      <table
        sx={{
          width: ["100%"],
          borderSpacing: 0,
          my: 1,
        }}
      >
        <thead
          sx={{
            fontFamily: "heading",
          }}
        >
          <tr>
            <th
              sx={{
                textAlign: "left",
                width: "15%",
                borderBottom: "solid 1px",
                borderBottomColor: "lightgrey",
              }}
            ></th>
            <th
              sx={{
                textAlign: "left",
                width: "62%",
                borderBottom: "solid 1px",
                borderBottomColor: "lightgrey",
              }}
            ></th>
            <th
              sx={{
                textAlign: "center",
                width: "7%",
                borderBottom: "solid 1px",
                borderBottomColor: "lightgrey",
                fontWeight: "body",
                fontSize: 3,
              }}
            >
              Mål
            </th>
            <th
              sx={{
                textAlign: "center",
                width: "7%",
                borderBottom: "solid 1px",
                borderBottomColor: "lightgrey",
                fontWeight: "body",
                fontSize: 3,
              }}
            >
              Ass
            </th>
            <th
              sx={{
                textAlign: "center",
                width: "9%",
                borderBottom: "solid 1px",
                borderBottomColor: "lightgrey",
                pt: 3,
                fontWeight: "body",
                fontSize: 4,
                color: "primary",
              }}
            >
              <FaStar />
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((x, i) => {
            const selected = gameState.find(y => y.id === x._id)
            const img = getLogo(x.team._id)
            return (
              <tr
                key={i}
                sx={{
                  fontWeight: selected ? "heading" : "body",
                  fontFamily: "body",
                  textAlign: "center",
                  height: 40,
                  cursor: "pointer",
                }}
                onClick={() => toggleSelected(x, selected, img)}
              >
                <td
                  sx={{
                    textAlign: "center",
                    py: 3,
                    borderBottom: selected ? "solid 1px" : "solid 2px",
                    borderBottomColor: selected ? "primary" : "muted",
                  }}
                >
                  <div sx={{ mx: "auto", maxWidth: 25 }}>
                    <Image fluid={img}></Image>
                  </div>
                </td>
                <td
                  sx={{
                    textAlign: "left",
                    fontSize: 4,
                    borderBottom: selected ? "solid 1px" : "solid 2px",
                    borderBottomColor: selected ? "primary" : "muted",
                  }}
                >
                  <div sx={{ display: "flex", alignItems: "center" }}>
                    <div>{x.name || x.fullName}</div>
                    <div sx={{ fontSize: 2, mx: 5 }}>
                      {x.team.name || x.team.fullName}
                    </div>
                  </div>
                </td>
                <td
                  sx={{
                    borderBottom: selected ? "solid 1px" : "solid 2px",
                    borderBottomColor: selected ? "primary" : "muted",
                  }}
                >
                  {x.goals}
                </td>
                <td
                  sx={{
                    borderBottom: selected ? "solid 1px" : "solid 2px",
                    borderBottomColor: selected ? "primary" : "muted",
                  }}
                >
                  {x.assists}
                </td>
                <td
                  sx={{
                    fontSize: selected ? 4 : 3,
                    color: selected ? "primary" : "text",
                    pt: 4,
                    borderBottom: selected ? "solid 1px" : "solid 2px",
                    borderBottomColor: selected ? "primary" : "muted",
                  }}
                >
                  {selected ? <FaStar></FaStar> : <FaRegStar />}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </motion.div>
  )
}
export default Players
