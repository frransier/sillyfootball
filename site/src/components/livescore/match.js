/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box } from "@theme-ui/components"
import Circle from "./circle"
import { useState } from "react"

const Match = ({ match }) => {
  const [selected] = useState(false)
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 4fr 2fr 4fr 1fr",
        alignItems: "center",

        fontFamily: "body",
        fontSize: 3,
        borderBottom: "solid 2px",
        borderBottomColor: "muted",
      }}
    >
      <div>
        {match.status && match.status === "ft" ? (
          <Circle color="red" />
        ) : match.status ? (
          <Circle color="#67FFBF" />
        ) : (
          <Circle color="background" />
        )}
      </div>
      <div>
        <div sx={{ textAlign: "right", my: 4 }}>
          {match.home.team.name || match.home.team.fullName}
        </div>
        {selected &&
          match.events &&
          match.events
            .filter(y => y.team._ref === match.home.team.id)
            .map((x, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: "right",
                }}
              >
                <Box>
                  {x.elapsed}' {x.player && x.player.name} ⚽
                </Box>
                <Box>{(x.assist && x.assist.name) || `No assist`} ➡</Box>
              </Box>
            ))}
      </div>
      <div
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: match.status ? 4 : 2,
        }}
      >
        {match.status
          ? `${match.home.goals || 0} - ${match.away.goals || 0}`
          : match.start.substr(11, 5)}
      </div>
      <div>
        <div>{match.away.team.name || match.away.team.fullName}</div>
        {selected &&
          match.events &&
          match.events
            .filter(y => y.team._ref === match.away.team.id)
            .map((x, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: "right",
                }}
              >
                <Box>
                  {x.elapsed}' {x.player && x.player.name} ⚽
                </Box>
                <Box>{(x.assist && x.assist.name) || `No assist`} ➡</Box>
              </Box>
            ))}
      </div>
      <div sx={{ textAlign: "center" }}>
        {match.status === "ft"
          ? ""
          : match.status === "ht"
          ? match.status
          : match.elapsed
          ? match.elapsed + `'`
          : ``}
      </div>
    </div>
  )
}

export default Match
