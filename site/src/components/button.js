/** @jsx jsx */
import { jsx } from "theme-ui"
import { useAuth } from "react-use-auth"
import { navigate } from "gatsby"
import { useGameDispatch } from "../state"

const Button = ({ text, action }) => {
  const gameDispatch = useGameDispatch()
  const { login } = useAuth()
  function actionPicker(action) {
    switch (action) {
      case "login":
        login()
        return
      case "account":
        navigate("/account/")
        return
      case "white-paper":
        navigate(`/${action}/`)
        return
      case "fantasy":
        navigate(`/${action}/`)
        return
      case "reset":
        gameDispatch({ type: "reset" })
        navigate("/account/")
        return
      default:
        break
    }
  }
  return (
    <button
      sx={{
        fontSize: 5,
        width: 120,
        my: 7,
        px: 6,
        py: 4,
        bg: "background",
        border: "solid 2px",
        borderColor: "primary",
        color: "text",
        borderRadius: 4,
        fontFamily: "heading",
        fontWeight: "heading",
        appearance: "none",
        cursor: "pointer",

        ":after": {
          color: "background",
          bg: "primary",
        },
        ":active, :after": {
          color: "background",
          bg: "primary",
          transform: `translateY(4px)`,

          opacity: 1,
          transition: `0s`,
        },
      }}
      onClick={() => actionPicker(action)}
    >
      {text}
    </button>
  )
}

export default Button
