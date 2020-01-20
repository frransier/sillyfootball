/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Button from "../components/button"
import { useEffect } from "react"
import { useUserDispatch } from "../state"
import { useCookies } from "react-cookie"
import { useAuth } from "react-use-auth"

const RepairPage = () => {
  const userDispatch = useUserDispatch()
  const { logout } = useAuth()
  const [cookies, setCookies, removeCookie] = useCookies(["did"])
  useEffect(() => {
    localStorage.removeItem("sillyfootball-user-1")
    localStorage.removeItem("sillyfootball-game-1")
    localStorage.removeItem("useAuth:user")
    localStorage.removeItem("useAuth:expires_at")
    userDispatch({ type: "reset" })
    removeCookie("did", { path: "/", domain: "dev-h964wuhp.eu.auth0.com" })
    logout()
  }, [])

  return (
    <Layout>
      <SEO title="Tack" />
      <Footer />
    </Layout>
  )
}
export default RepairPage
