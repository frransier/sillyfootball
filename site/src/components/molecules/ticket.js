/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Score from "./score"
import { useState, Fragment } from "react"
import { FaTrophy, FaLock } from "react-icons/fa"
import Frame from "../atoms/frame"
import { useGlobalState } from "../../state"

const Ticket = ({ ticket, disabled, winner }) => {
  const [show, setShow] = useState(false)
  const state = useGlobalState()
  if (state.user && ticket.user._id === state.user._id) {
    disabled = true
  }
  if (disabled === false) winner = false

  return (
    <Fragment>
      <button
        sx={{
          cursor: "pointer",
          my: 2,
          py: 3,
          px: 0,
          appearance: "none",
          bg: "background",
          color: "text",
          outline: "none",
          width: "100%",
          border: "none",
          borderBottom: "solid 0.5px",
          borderColor: "muted"
        }}
        disabled={!disabled}
        onClick={() => setShow(!show)}
      >
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: ["61% 13% 13% 13%", "55% 15% 15% 15%"]
          }}
        >
          <div
            sx={{
              display: "flex",
              textAlign: "left",
              m: 1,
              ml: [0, 2],
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
            {disabled === false && (
              <Frame borderRadius={0} mr={4}>
                <FaLock sx={{ color: "primary", bg: "secondary" }} size={15} />
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
              justifySelf: "end",
              mx: 3
              // fontWeight: "heading"
            }}
          >
            {show ? "Goals" : ""}
          </Styled.p>
          <Styled.p
            sx={{
              textAlign: "right",
              alignSelf: "center",
              justifySelf: "end",
              mx: -1
              // fontWeight: "heading"
            }}
          >
            {show ? "Assists" : ""}
          </Styled.p>
          <Styled.p
            sx={{
              // textAlign: "center",
              alignSelf: "center",
              justifySelf: "end",
              mr: ["10px", 4],
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
