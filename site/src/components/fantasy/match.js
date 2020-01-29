/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import { useFilterState, useFilterDispatch } from "../../state"
import { motion } from "framer-motion"

const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"]

const Match = ({ match, index }) => {
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
        height: 45,
        my: 2,
        mx: 2,
        cursor: "pointer",
        border: "solid 3px",
        borderColor: "muted",
        borderRadius: 4,
        outline: "none",
      }}
      onClick={() => toggleSelected()}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: index / 12,
          duration: 0.2,
        }}
      >
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: "80% 20%",

            // alignItems: "center",
            fontSize: 3,

            bg: selected ? "primary" : "background",
          }}
        >
          <div
            sx={{
              fontFamily: "body",
              fontWeight: "body",
              textAlign: "left",
              color: selected ? "background" : "text",
            }}
          >
            <div>{match.home.team.name || match.home.team.fullName}</div>
            <div>{match.away.team.name || match.away.team.fullName}</div>
          </div>
          <div
            sx={{
              fontFamily: "body",
              fontWeight: "body",
              textAlign: "right",
              color: selected ? "background" : "text",
              fontSize: 2,
              alignSelf: "center",
            }}
          >
            <div
              sx={{
                color: selected ? "background" : "text",
              }}
            >
              {weekday}
            </div>
            <div sx={{}}>{`${hours}:${minutes}`}</div>
          </div>

          {/* <div
            sx={{
              fontFamily: "body",
              fontWeight: "body",
              color: selected ? "background" : "primary",
              pt: 2,
              justifySelf: "end",
              // mx: 3,
            }}
          >
            {selected ? <FaAngleDown size={18} /> : <FaAngleRight size={18} />}
          </div> */}
        </div>
      </motion.div>
    </button>
  )
}

export default Match
