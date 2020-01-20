/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import { useEffect } from "react"
import { useUserDispatch } from "../state"
import { useAuth } from "react-use-auth"

const RepairPage = () => {
  const userDispatch = useUserDispatch()
  const { logout } = useAuth()
  useEffect(() => {
    localStorage.removeItem("sillyfootball-user-1")
    localStorage.removeItem("sillyfootball-game-1")
    localStorage.removeItem("useAuth:user")
    localStorage.removeItem("useAuth:expires_at")
    userDispatch({ type: "reset" })
    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <SEO title="Reparera" />
      <Footer />
    </Layout>
  )
}
export default RepairPage
