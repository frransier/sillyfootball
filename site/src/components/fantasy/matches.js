/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Match from "./match"

const Matches = ({ matches }) => {
  return (
    <div sx={{}}>
      <div
        sx={{
          display: "grid",

          gridTemplateColumns: ["48% 48%", "32% 32% 32%"],
        }}
      >
        {matches.map((x, i) => (
          <Match match={x} key={i} index={i} />
        ))}
      </div>
      <div>
        <Styled.h3 sx={{ mx: 4, my: 3, display: "flex" }}>
          Välj en match för att filtrera
        </Styled.h3>
      </div>
    </div>
  )
}
export default Matches
