import React from "react"
import Container from "./src/state/container.js"

export const wrapRootElement = ({ element }) => <Container>{element}</Container>
