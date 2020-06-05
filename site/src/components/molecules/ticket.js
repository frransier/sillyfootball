/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Score from "./score"
import { useState, Fragment } from "react"
import { FaTrophy } from "react-icons/fa"

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
              fontSize: 2
            }}
          >
            {winner && (
              <div
                sx={{
                  bg: "secondary",
                  display: "grid",
                  alignItems: "center",
                  borderRadius: 3,
                  p: 2,
                  mr: 4
                }}
              >
                <FaTrophy sx={{ mx: 2, color: "primary", height: 15 }} />
              </div>
            )}{" "}
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
