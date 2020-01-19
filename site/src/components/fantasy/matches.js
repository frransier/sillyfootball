/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Match from "./match"
import { useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const Matches = ({ matches }) => {
  const [show, setShow] = useState(true)
  return (
    <div sx={{ display: "grid" }}>
      {show
        ? matches.map((x, i) => {
            if (i < 3) return <Match index={i} match={x} />
            return null
          })
        : matches.map((x, i) => <Match index={i} match={x} key={i} />)}

      <div sx={{ mx: "auto" }}>
        <Styled.h2
          sx={{
            my: 3,
            fontSize: 3,
          }}
          onClick={() => setShow(!show)}
        >
          {show ? (
            <div sx={{ display: "flex", cursor: "pointer" }}>
              <div sx={{ mt: 1, mx: 2 }}>
                <FaAngleDown></FaAngleDown>
              </div>
              Alla matcher
            </div>
          ) : (
            <div sx={{ display: "flex", cursor: "pointer" }}>
              <div sx={{ mt: 1, mx: 2 }}>
                <FaAngleUp />
              </div>
              Klicka på en match för att filtrera
            </div>
          )}
        </Styled.h2>
      </div>
    </div>
  )
}
export default Matches
