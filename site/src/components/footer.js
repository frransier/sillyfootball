/** @jsx jsx */
import { jsx } from "theme-ui"
import logo from "../images/sillyfootball.svg"
import logoDark from "../images/sillyfootball-dark.svg"
import Nav from "./nav"
import { useColorMode } from "theme-ui"
import { FaTwitter, FaFacebook, FaDiscord } from "react-icons/fa"

const Footer = () => {
  const [colorMode] = useColorMode()
  return (
    <div sx={{ my: 7 }}>
      <div sx={{ width: "70%", mx: "auto" }}>
        <Nav></Nav>
      </div>
      <div sx={{ width: "50%", mx: "auto" }}>
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            textAlign: "center",
            fontSize: [5, 6],
            my: 4,
          }}
        >
          <div sx={{ mx: "auto" }}>
            <FaTwitter></FaTwitter>
          </div>
          <div sx={{ mx: "auto" }}>
            <FaFacebook></FaFacebook>
          </div>
          <div sx={{ mx: "auto" }}>
            <FaDiscord></FaDiscord>
          </div>
        </div>
      </div>

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
