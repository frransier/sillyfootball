import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Text, Heading, Box } from "rebass"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Box width={[1, 4 / 5, 3 / 5]} mx="auto">
      <Heading>Oops..!</Heading>
      <Text>You just hit a route that doesn't exist... the sadness.</Text>
    </Box>
  </Layout>
)

export default NotFoundPage
