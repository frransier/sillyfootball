/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobalDispatch } from "../state"
import { useEffect } from "react"
import Loading from "../components/molecules/loading"

import { navigate } from "gatsby"

const RepairPage = () => {
  const dispatch = useGlobalDispatch()

  useEffect(() => {
    dispatch({ type: "reset" })
    navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <SEO title="Repair" />
      <Loading />
    </Layout>
  )
}

export default RepairPage
