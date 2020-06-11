/** @jsx jsx */
import { jsx } from "theme-ui"
import Centered from "../atoms/centered"
import ReactLoading from "react-loading"
import Frame from "../atoms/frame"

const Loading = () => {
  return (
    <Centered height="100vh">
      <div sx={{ height: "50%" }}>
        <Frame borderWidth={0} borderRadius={999} height={60} width={60}>
          <div
            sx={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              bg: "secondary",
              py: 4,
              px: 4,
              borderRadius: 999,
              height: 60,
              width: 60
            }}
          >
            <ReactLoading type="bars" color="#66fcf1" height={30} width={30} />
          </div>
        </Frame>
      </div>
    </Centered>
  )
}

export default Loading
