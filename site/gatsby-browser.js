import React from "react"
import "typeface-alfa-slab-one"
import "typeface-cabin"
import "typeface-roboto-condensed"

import { Provider } from "./src/state/"

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>
