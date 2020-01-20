/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { useFilterState, useFilterDispatch } from "../../state"
import { FaAngleDown, FaAngleRight } from "react-icons/fa"

const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"]

const Match = ({ match }) => {
  const filters = useFilterState()
  const filterDispatch = useFilterDispatch()
  const [selected, setSelected] = useState(false)
  const date = new Date(match.start)
  const minutes = date.getMinutes() === 0 ? "00" : `${date.getMinutes()}`
  const hours = `${date.getHours()}`
  const weekday = weekdays[date.getDay()]

  useEffect(() => {
    if (filters.includes(match.home.team._id)) setSelected(true)
    else setSelected(false)
  }, [filters, match.home.team._id])
  useEffect(() => {
    return () => {
      filterDispatch({ type: "reset" })
    }
  }, [filterDispatch])

  function toggleSelected() {
    if (selected) {
      filterDispatch({ type: "reset" })
    } else {
      filterDispatch({
        type: "filter",
        homeTeamId: match.home.team._id,
        awayTeamId: match.away.team._id,
      })
    }
  }
  return (
    <button
      sx={{
        border: "none",
        appearance: "none",
        bg: selected ? "primary" : "background",
        height: 28,
        my: 2,
        cursor: "pointer",
        borderRadius: 2,
      }}
      onClick={() => toggleSelected()}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 30% 20% 30% 10%",
          alignItems: "center",
          fontSize: 3,
          bg: selected ? "primary" : "background",
          // borderBottom: selected ? "solid 1px" : "none",
          // borderBottomColor: "primary",
        }}
      >
        <div
          sx={{
            fontFamily: "body",
            fontWeight: "body",
            color: selected ? "background" : "primary",
            mt: 2,
          }}
        >
          {selected ? <FaAngleDown size={20} /> : <FaAngleRight size={20} />}
        </div>
        <div
          sx={{
            fontFamily: "body",
            fontWeight: selected ? "heading" : "body",
            textAlign: "right",
            color: selected ? "background" : "text",
          }}
        >
          {match.home.team.name || match.home.team.fullName}
        </div>
        <div
          sx={{
            fontFamily: "body",
            fontWeight: selected ? "heading" : "body",
            textAlign: "center",
            color: selected ? "background" : "text",
          }}
        >
          <div sx={{ fontSize: 2 }}>{`${hours}:${minutes}`}</div>
        </div>
        <div
          sx={{
            fontFamily: "body",
            fontWeight: selected ? "heading" : "body",
            textAlign: "left",
            color: selected ? "background" : "text",
          }}
        >
          {match.away.team.name || match.away.team.fullName}
        </div>
        <div sx={{ fontSize: 1, color: selected ? "background" : "text" }}>
          {weekday}
        </div>
      </div>
    </button>
    // <tr
    //   sx={{
    //     fontWeight: "body",
    //     fontFamily: "body",
    //     textAlign: "center",
    //     borderBottom: "solid 1px",
    //     borderBottomColor: "muted",
    //     height: 30,
    //   }}
    //   onClick={() => toggleSelected()}
    // >
    //   <td
    //     sx={{
    //       width: "40%",
    //       fontSize: 3,
    //       textAlign: "right",
    //       mx: "auto",
    //       fontWeight: selected ? "heading" : "body",
    //       borderBottom: selected ? "solid 1px" : "solid 2px",
    //       borderBottomColor: selected ? "primary" : "muted",
    //     }}
    //   >
    //     {match.home.team.name || match.home.team.fullName}
    //   </td>
    //   <td
    //     sx={{
    //       width: "20%",
    //       textAlign: "center",
    //       fontFamily: "heading",
    //       fontWeight: "heading",
    //       borderBottom: selected ? "solid 1px" : "solid 2px",
    //       borderBottomColor: selected ? "primary" : "muted",
    //     }}
    //   >
    //     <div>
    //       <div sx={{ fontSize: 2 }}>{`${hours}:${minutes}`}</div>
    //       <div sx={{ fontSize: 1 }}>{weekday}</div>
    //     </div>
    //   </td>
    //   <td
    //     sx={{
    //       width: "40%",
    //       fontSize: 3,
    //       textAlign: "left",
    //       mx: "auto",
    //       fontWeight: selected ? "heading" : "body",
    //       borderBottom: selected ? "solid 1px" : "solid 2px",
    //       borderBottomColor: selected ? "primary" : "muted",
    //     }}
    //   >
    //     {match.away.team.name || match.away.team.fullName}
    //   </td>
    // </tr>
  )
}

export default Match
