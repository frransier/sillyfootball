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
        <Styled.h2 sx={{ mb: 2, mt: 7 }}>Fullt lag!</Styled.h2>
        <Styled.h3 sx={{ mb: 2, mt: 7 }}>
          Lämna in eller ta bort en spelare för att se spelarlistan igen
        </Styled.h3>
        <Button text="Lämna in" action="post" />
      </div>
    )
  }

  return <div>test</div>

  //   return (
  //     <button

  //       sx={{
  //         appearance: "none",
  //         bg: "background",
  //         border: "none",
  //         mx: [3, 6, 8],
  //       }}
  //       aria-label="Player Avatar"
  //     >
  //       <div
  //         sx={{
  //           maxWidth: 35,
  //           mx: "auto",
  //           py: 2,
  //         }}
  //       >
  //         <Image fluid={player.logo} />
  //       </div>
  //       <div
  //         sx={{
  //           borderBottom: "solid 3px",
  //           borderBottomColor: "primary",
  //           p: 2,
  //           mt: 4,
  //           width: [90, 100, 110],
  //         }}
  //       >
  //         <Styled.h4
  //           sx={{
  //             fontWeight: "body",
  //             fontFamily: "heading",
  //             fontSize: [2, 3, 4],
  //             py: 2,
  //             my: 0,
  //             color: "text",
  //           }}
  //         >
  //           {player.name}
  //         </Styled.h4>
  //       </div>
  //     </button>
  //   )
}

export default Play
