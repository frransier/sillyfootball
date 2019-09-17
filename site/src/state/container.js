import React from "react"
import { Provider } from "./index"

const Container = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default Container
