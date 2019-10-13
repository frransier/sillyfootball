import React from "react"
import "typeface-alfa-slab-one"
import "typeface-roboto"
import "typeface-open-sans"
import "typeface-merriweather"
import Container from "./src/state/container.js"

export const wrapRootElement = ({ element }) => <Container>{element}</Container>
