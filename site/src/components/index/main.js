/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import pick from "../../images/pick.svg"
import pickDark from "../../images/pick-dark.svg"
import winDark from "../../images/win-dark.svg"
import win from "../../images/win.svg"
import Card from "./card"
import { GiMining, GiDiamondHard } from "react-icons/gi"
import fantasy from "../../images/fantasy.svg"
import fantasyDark from "../../images/fantasy-dark.svg"

const Main = ({ deadline }) => {
  const [colorMode] = useColorMode()

  return (
    <div
      sx={{
        // border: "solid 2px",
        // borderColor: "muted",
        // borderRadius: 8,
        width: "95%",
        py: 8,
        mb: 7,
      }}
    >
      <div
        sx={{
          display: "grid",
          gridTemplateRows: "20% 30% 30% 20%",
          alignItems: "center",
          justifyItems: "center",
          my: 0,
        }}
      >
        <img
          sx={{
            width: 290,
            height: 35,
          }}
          src={colorMode === "default" ? fantasy : fantasyDark}
          alt="Fantasy Football"
        />
        <img
          sx={{
            width: 250,
            height: 23,
            mx: "auto",
            my: 8,
          }}
          src={colorMode === "default" ? pick : pickDark}
          alt="Fantasy Football"
        />
        <img
          sx={{
            width: 250,
            height: 20,
            mx: "auto",
            my: 8,
          }}
          src={colorMode === "default" ? win : winDark}
          alt="Fantasy Football"
        />

        <Styled.h1
          sx={{
            borderBottom: "solid 3px",
            borderBottomColor: "primary",
            my: 3,
          }}
        >
          {deadline}
        </Styled.h1>
      </div>
      <div
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          icon={<GiMining />}
          title="Easy to learn"
          body1="Välj 5 spelare."
          body2="1p per mål/assist."
          cta="Spela"
          action="fantasy"
        />
        <Card
          icon={<GiDiamondHard />}
          title="Hard to master"
          body1="Bli ensam vinnare."
          body2="Vinn 500 kronor."
          cta="Läs mer"
          action="white-paper"
        />
      </div>
    </div>
  )
}

export default Main
