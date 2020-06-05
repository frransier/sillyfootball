/** @jsx jsx */
import { jsx } from "theme-ui"
import Centered from "../atoms/centered"
import ReactLoading from "react-loading"
import Frame from "../atoms/frame"

const Loading = () => {
  return (
    <Centered height="100vh">
      <div sx={{ height: "50%" }}>
        <Frame borderWidth={1}>
          <div sx={{ bg: "secondary", py: 4, px: 5 }}>
            <ReactLoading type="bars" color="white" height={35} width={35} />
          </div>
        </Frame>
      </div>
    </Centered>
  )
}

export default Loading
