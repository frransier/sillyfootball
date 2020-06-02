/** @jsx jsx */
import { jsx } from "theme-ui"
import Centered from "../atoms/centered"
import ReactLoading from "react-loading"

const Loading = () => {
  return (
    <Centered height="100vh">
      <div sx={{ height: "50%" }}>
        <ReactLoading type="bars" color="#66fcf1" height={35} width={35} />
      </div>
    </Centered>
  )
}

export default Loading
