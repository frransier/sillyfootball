/** @jsx jsx */
import { jsx } from "theme-ui"
import { useAuth } from "react-use-auth"
import { navigate } from "gatsby"

const Button = ({ text, action }) => {
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
      }}
      onClick={() => actionPicker(action)}
    >
      {text}
    </button>
  )
}

export default Button
