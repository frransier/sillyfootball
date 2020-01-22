/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import logo from "../images/sillyfootball.svg"
import logoDark from "../images/sillyfootball-dark.svg"
import { useColorMode } from "theme-ui"
import { FiSun } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"
import { FaAngleRight } from "react-icons/fa"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div sx={{ my: 7 }}>
      <div sx={{ textAlign: "center", mt: 5 }}>
        <Link to="/">
          <img
            height={35}
            width={200}
            src={colorMode === "default" ? logo : logoDark}
            alt="Sillyfootball icon"
          ></img>
        </Link>
      </div>
      <Link to="/regler/" style={{ textDecoration: "none" }}>
        <div
          sx={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Styled.h2 sx={{ my: 4 }}>Så funkar det</Styled.h2>
          <Styled.h2 sx={{ mx: 2, my: 4 }}>
            <div sx={{ mt: 2 }}>
              <FaAngleRight />
            </div>
          </Styled.h2>
        </div>
      </Link>
      <div sx={{ textAlign: "center", my: 5 }}>
        <button
          sx={{
            bg: "primary",
            color: "background",
            border: "none",
            borderRadius: 2,
            fontSize: 3,
            pt: 4,
            pb: 3,
            pointer: "cursor",
            appearance: "none",
          }}
          aria-label="Color Mode"
          onClick={() =>
            setColorMode(colorMode === "default" ? "dark" : "default")
          }
        >
          {colorMode === "default" ? <IoMdMoon></IoMdMoon> : <FiSun></FiSun>}
        </button>
      </div>
    </div>
  )
}

export default Footer
