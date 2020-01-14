/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Footer from "../components/footer"
import Button from "../components/button"
import { useUserState, useGameDispatch } from "../state"
import { useEffect } from "react"

const ThanksPage = () => {
  const userState = useUserState()
  const gameDispatch = useGameDispatch()
  useEffect(() => {
    gameDispatch({ type: "reset" })
  }, [gameDispatch])
  return (
    <Layout>
      <SEO title="Profile" />
      <Nav />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 5,
          my: 5,
        }}
      >
        <Styled.h1>
          Tack för att du spelar, {userState && userState.name}
        </Styled.h1>
        <Styled.h2>Sillyfootball är öppet för alla. Bjud in polarna!</Styled.h2>
        <Button text={`${userState && userState.name}`} action="account" />
      </div>
      <Footer />
    </Layout>
  )
}
export default ThanksPage
