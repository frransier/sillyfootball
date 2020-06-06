/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Score from "./score"
import { useState, Fragment } from "react"
import { FaTrophy } from "react-icons/fa"
import Frame from "../atoms/frame"

const Ticket = ({ ticket, disabled, winner }) => {
  const [show, setShow] = useState(false)
  // console.log(ticket)

  return (
    <Fragment>
      <button
        sx={{
          cursor: "pointer",
          my: 3,
          py: 3,
          px: 0,
          appearance: "none",
          bg: "background",
          color: "text",
          outline: "none",
          width: "100%",
          border: "none",
          borderBottom: "solid 1px",
          borderColor: "darkgrey"
        }}
        disabled={disabled}
        onClick={() => setShow(!show)}
      >
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["56% 17% 17% 10%", "55% 15% 15% 15%"]
          }}
        >
          <div
            sx={{
              display: "flex",
              textAlign: "left",
              m: 1,
              fontSize: 2,
              alignItems: "center"
            }}
          >
            {winner && (
              <Frame borderRadius={0} mr={4}>
                <FaTrophy
                  sx={{ color: "primary", bg: "secondary" }}
                  size={15}
                />
              </Frame>
            )}
            <Styled.p sx={{ fontWeight: show ? 700 : 500, p: 2 }}>
              {ticket.user.name}
            </Styled.p>
          </div>

          <Styled.p
            sx={{
              textAlign: "right",
              alignSelf: "center",
              justifySelf: "center",
              mx: -2
              // fontWeight: "heading"
            }}
          >
            {show ? "Goals" : ""}
          </Styled.p>
          <Styled.p
            sx={{
              textAlign: "right",
              alignSelf: "center",
              justifySelf: "center",
              mx: -2
              // fontWeight: "heading"
            }}
          >
            {show ? "Assists" : ""}
          </Styled.p>
          <Styled.p
            sx={{
              textAlign: "right",
              alignSelf: "center",
              justifySelf: "center",
              fontWeight: "heading"
            }}
          >
            {ticket.score.toFixed(1)}
          </Styled.p>
        </div>
      </button>
      {show && (
        <div sx={{ mt: 2 }}>
          {ticket.scores
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map((x, i) => (
              <Score key={i} player={x} />
            ))}
        </div>
      )}
    </Fragment>
  )
}

export default Ticket
