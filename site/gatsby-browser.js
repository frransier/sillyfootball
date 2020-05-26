import React from "react"

import { Provider } from "./src/state/"

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>
