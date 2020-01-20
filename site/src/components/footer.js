/** @jsx jsx */
import { jsx } from "theme-ui"
import logo from "../images/sillyfootball.svg"
import logoDark from "../images/sillyfootball-dark.svg"
import { useColorMode } from "theme-ui"
import { FiSun } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"

const Footer = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div sx={{ my: 7 }}>
      <div sx={{ textAlign: "center", my: 5 }}>
        <img
          height={35}
          width={200}
          src={colorMode === "default" ? logo : logoDark}
          alt="Sillyfootball icon"
        ></img>
      </div>
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
