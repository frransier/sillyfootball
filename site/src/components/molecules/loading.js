/** @jsx jsx */
import { jsx } from "theme-ui"
import Centered from "../atoms/centered"
import ReactLoading from "react-loading"

const Loading = () => {
  return (
    <Centered height="100vh">
      <div sx={{ height: "50%" }}>
        <div sx={{ bg: "secondary", p: 3, borderRadius: 8 }}>
          <ReactLoading type="bars" color="#66fcf1" height={35} width={35} />
        </div>
      </div>
    </Centered>
  )
}

export default Loading
