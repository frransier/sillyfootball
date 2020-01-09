/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { usePlayerState, usePlayerDispatch } from "../../state"

const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"]

const Match = ({ index, match }) => {
  const filters = usePlayerState()
  const playerDispatch = usePlayerDispatch()
  const [selected, setSelected] = useState(false)
  const date = new Date(match.start)
  const weekday = weekdays[date.getDay()]

  useEffect(() => {
    if (filters.includes(match.home.team._id)) setSelected(true)
    else setSelected(false)
  }, [filters, match.home.team._id])
  useEffect(() => {
    return () => {
      playerDispatch({ type: "reset" })
    }
  }, [playerDispatch])

  function toggleSelected() {
    if (selected) {
      playerDispatch({ type: "reset" })
    } else {
      playerDispatch({
        type: "filter",
        homeTeamId: match.home.team._id,
        awayTeamId: match.away.team._id,
      })
    }
  }
  return (
    <tr
      sx={{
        fontWeight: "body",
        fontFamily: "body",
        textAlign: "center",
        borderBottom: "solid 1px",
        borderBottomColor: "muted",
        height: 30,
      }}
      onClick={() => toggleSelected()}
    >
      <td
        sx={{
          width: "40%",
          fontSize: 3,
          textAlign: "right",
          mx: "auto",
          fontWeight: selected ? "heading" : "body",
          borderBottom: selected ? "solid 1px" : "solid 2px",
          borderBottomColor: selected ? "primary" : "muted",
        }}
      >
        {match.home.team.name || match.home.team.fullName}
      </td>
      <td
        sx={{
          width: "20%",
          textAlign: "center",
          fontFamily: "heading",
          fontWeight: "heading",
          borderBottom: selected ? "solid 1px" : "solid 2px",
          borderBottomColor: selected ? "primary" : "muted",
        }}
      >
        <div>
          <div sx={{ fontSize: 2 }}>{match.start.substr(11, 5)}</div>
          <div sx={{ fontSize: 1 }}>{weekday}</div>
        </div>
      </td>
      <td
        sx={{
          width: "40%",
          fontSize: 3,
          textAlign: "left",
          mx: "auto",
          fontWeight: selected ? "heading" : "body",
          borderBottom: selected ? "solid 1px" : "solid 2px",
          borderBottomColor: selected ? "primary" : "muted",
        }}
      >
        {match.away.team.name || match.away.team.fullName}
      </td>
    </tr>
  )
}

export default Match
