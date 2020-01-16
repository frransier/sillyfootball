/** @jsx jsx */
import { jsx } from "theme-ui"
import logo from "../images/sillyfootball.svg"
import logoDark from "../images/sillyfootball-dark.svg"
import { useColorMode } from "theme-ui"

const Footer = () => {
  const [colorMode] = useColorMode()
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
    </div>
  )
}

export default Footer
