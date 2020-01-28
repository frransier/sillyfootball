/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import main from "../../images/main.svg"
import mainDark from "../../images/main-dark.svg"
import Button from "../button"
import { motion } from "framer-motion"

const Main = ({ deadline }) => {
  const [colorMode] = useColorMode()

  return (
    <div
      sx={{
        // border: "solid 2px",
        // borderColor: "muted",
        // borderRadius: 8,
        width: "95%",
        py: 4,
        mb: 7,
      }}
    >
      <div
        sx={{
          display: "grid",
          justifyItems: "start",
          my: 0,
        }}
      >
        <img
          sx={{
            width: "90%",
            my: 8,
          }}
          src={colorMode === "default" ? main : mainDark}
          alt="Fantasy Football"
        />

        <div sx={{ display: "flex", alignItems: "center", my: 7 }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
          >
            <Button text="Spela" action="fantasy" />
          </motion.div>
          <Styled.h1
            sx={{
              my: 0,
              ml: 7,
            }}
          >
            {deadline}
          </Styled.h1>
          {/* <div sx={{ mx: 5 }}> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Main
