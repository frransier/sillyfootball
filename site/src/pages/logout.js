/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobalDispatch } from "../state"
import { useEffect } from "react"
import Loading from "../components/molecules/loading"
import { useAuth0 } from "../state/auth0"

const LogoutPage = () => {
  const dispatch = useGlobalDispatch()
  const { logout } = useAuth0()

  useEffect(() => {
    dispatch({ type: "reset" })
    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <SEO title="Logout" />
      <Loading />
    </Layout>
  )
}

export default LogoutPage
