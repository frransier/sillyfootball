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
        bg: "rgb(255,82,82)",
        background:
          "radial-gradient(circle, rgba(255,82,82,1) 0%, rgba(255,82,82,1) 25%, rgba(255,82,82,1) 72%, rgba(230,68,68,1) 100%)",
        border: "solid 2px",
        borderColor: "lightgrey",
        color: "background",
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
