/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useUserState } from "../../state"
import Button from "../button"

const Play = ({ entries }) => {
  const userState = useUserState()

  if (userState && entries && userState.length === 0) {
    return (
      <div sx={{ display: "grid", justifyItems: "center" }}>
        <Styled.h2 sx={{ mb: 2, mt: 7 }}>Logga in för att fortsätta</Styled.h2>
        <Button text="Logga in" action="login" />
        <Styled.h2 sx={{ my: 2 }}>
          Bli medlem kostnadsfritt med ett par klick
        </Styled.h2>
        <Button text="Bli medlem" action="login" />
      </div>
    )
  }
  if (
    userState &&
    entries &&
    userState.length !== 0 &&
    entries.includes(userState.name)
  ) {
    return (
      <div sx={{ display: "grid", justifyItems: "center" }}>
        <Styled.h2 sx={{ mb: 2, mt: 7 }}>
          Du är redan anmäld till den här omgången
        </Styled.h2>
        <Button text={userState.name} action="account" />
      </div>
    )
  }
  if (
    userState &&
    entries &&
    userState.length !== 0 &&
    !entries.includes(userState.name)
  ) {
    return (
      <div sx={{ display: "grid", justifyItems: "center" }}>
        <Styled.h1 sx={{ mb: 2, mt: 7 }}>
          Fullt lag{" "}
          <span role="img" aria-label="Ready">
            ✔️
          </span>
        </Styled.h1>
        <Styled.h3 sx={{ mb: 2, mt: 7 }}>
          Lämna in eller ta bort en spelare för att se spelarlistan igen
        </Styled.h3>
        <Button text="Lämna in" action="play" />
      </div>
    )
  }

  return (
    <div>
      Hmm. Refresha sidan eller kontakta supporten på hello@sillyfootball.se om
      problemet kvarstår
    </div>
  )
}

export default Play
