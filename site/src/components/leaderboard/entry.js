/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import { AiOutlineMeh } from "react-icons/ai"
import { FaStar } from "react-icons/fa"
import gold from "../../images/gold.svg"
import silver from "../../images/silver.svg"
import bronze from "../../images/bronze.svg"
import { FaAngleDown, FaAngleRight } from "react-icons/fa"

const Entry = ({ x, scores, start }) => {
  const [show, setShow] = useState(false)

  // console.log(x.points)

  return (
    <div
      sx={{
        borderBottom: show ? "solid 1px" : "solid 2px",
        borderBottomColor: show ? "primary" : "muted",
      }}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "10% 59% 10% 10% 10%",
          alignItems: "center",
          my: 2,
        }}
      >
        <div sx={{ textAlign: "center", fontSize: 5 }}>
          {x.points === scores[0] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={gold} alt="Gold" />
          ) : x.points === scores[1] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={silver} alt="Silver" />
          ) : x.points === scores[2] ? (
            <img sx={{ width: "50%", mx: "auto" }} src={bronze} alt="Bronze" />
          ) : (
            <AiOutlineMeh />
          )}
        </div>

        <button
          sx={{
            border: "none",
            appearance: "none",
            bg: "background",
            cursor: "pointer",
          }}
          onClick={() => (start ? setShow(!show) : setShow(false))}
        >
          <div
            sx={{
              textAlign: "left",
              fontSize: 5,
              display: "flex",
              alignItems: "center",
              color: "text",
            }}
          >
            <Styled.h2
              sx={{
                textAlign: "left",
                my: 0,
                fontSize: 4,
                fontWeight: show ? "heading" : "body",
              }}
            >
              {x.user.name}
            </Styled.h2>
            <div
              sx={{
                color: start ? "text" : "darkgrey",
                mx: 4,
                mt: 1,
                fontSize: 3,
              }}
            >
              {show ? <FaAngleDown /> : <FaAngleRight />}
            </div>
          </div>
        </button>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show ? "Mål" : ""}
        </Styled.p>

        <Styled.p sx={{ textAlign: "center", my: 0, fontSize: 3 }}>
          {show && "Ass"}
        </Styled.p>

        <Styled.h3 sx={{ textAlign: "center", my: 0, pt: 2, fontSize: 5 }}>
          {x.points}p
        </Styled.h3>
      </div>
      {show &&
        x.players.map((x, i) => (
          <div
            key={i}
            sx={{
              display: "grid",
              ml: 6,
              gridTemplateColumns: "10% 59% 10% 10% 10%",
              borderBottom: "solid 3px",
              borderBottomColor: "muted",
            }}
          >
            <div
              sx={{
                textAlign: "center",
                fontSize: 2,
                my: 3,
                color: "primary",
              }}
            >
              {x.score && (x.score.goals || x.score.assists) ? <FaStar /> : ""}
            </div>
            <Styled.p sx={{ textAlign: "left", mx: 4, my: 0 }}>
              {x.name || x.fullName}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(x.score && x.score.goals) || ""}
            </Styled.p>
            <Styled.p sx={{ textAlign: "center", my: 0 }}>
              {(x.score && x.score.assists) || ""}
            </Styled.p>
            <div></div>
          </div>
        ))}
    </div>
  )
}

export default Entry
