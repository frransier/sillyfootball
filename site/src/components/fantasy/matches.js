/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Match from "./match"
import { useState } from "react"

const Matches = ({ matches }) => {
  const [show, setShow] = useState(true)
  return (
    <div sx={{ display: "grid" }}>
      {show ? (
        <Match index={2} match={matches[0]} />
      ) : (
        matches.map((x, i) => <Match index={i} match={x} key={i} />)
      )}
      <div sx={{ mx: "auto" }}>
        <Styled.h2
          sx={{
            textAlign: "center",

            my: 3,
            fontSize: 3,
            borderBottom: "solid 1px",
            borderBottomColor: "primary",
          }}
          onClick={() => setShow(!show)}
        >
          {show ? "Alla matcher" : "Klicka på en match för att filtrera"}
        </Styled.h2>
      </div>
    </div>
  )
}
export default Matches
