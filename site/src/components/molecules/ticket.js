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
          my: 1,
          py: 0,
          px: 0,
          appearance: "none",
          bg: "background",
          outline: "none",
          width: "100%",
          borderRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 2,
          borderTopLeftRadius: 5,
          border: disabled ? "none" : show ? "solid 1px" : "none",
          borderBottom: "solid 1px",
          borderColor: winner ? "red" : "darkgrey"
        }}
        disabled={disabled}
        onClick={() => setShow(!show)}
      >
        <div sx={{ display: "grid", gridTemplateColumns: "58% 14% 14% 14%" }}>
          <Styled.p
            sx={{
              textAlign: "left",
              fontWeight: show ? 700 : 400,
              m: 1,
              fontSize: 2
            }}
          >
            {winner && <FaTrophy sx={{ mx: 2, color: "red" }} />}{" "}
            {ticket.user.name}
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
      {show &&
        ticket.scores
          .sort((a, b) => (a.points < b.points ? 1 : -1))
          .map((x, i) => <Score key={i} player={x} />)}
    </Fragment>
  )
}

export default Ticket
