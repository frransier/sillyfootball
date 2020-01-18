/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useEffect } from "react"
import { useAuth } from "react-use-auth"
import { Input, Spinner } from "@theme-ui/components"
import { navigate } from "gatsby"
import axios from "axios"
import { useUserDispatch } from "../state"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  token: process.env.SANITY,
  useCdn: false,
})

const AuthPage = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, handleAuthentication } = useAuth()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    if (user.sub) {
      const query = `*[_type == "user" && id == $id]`
      const params = { id: user.sub }
      client.fetch(query, params).then(x => {
        if (x && x.length > 0) {
          userDispatch({ type: "init", user: x })
          handleAuthentication({ postLoginRoute: "/account/" })
        } else {
          setShow(true)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  function register(userId, name, firstName, lastName, email) {
    setLoading(true)
    const user = {
      id: userId,
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }

    axios
      .post("/.netlify/functions/sign-up", { user: user })
      .then(res => {
        res.data === "OK"
          ? handleAuthentication({ postLoginRoute: "/account/" })
          : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <Layout>
      <SEO title="Välj användarnamn" />

      {show ? (
        <div sx={{ display: "grid" }}>
          <div sx={{ mx: "auto" }}>
            <Styled.h1
              sx={{
                textAlign: "center",
              }}
            >
              Välj ett användarnamn
            </Styled.h1>
            <div sx={{ mx: "auto", width: "70%" }}>
              <Styled.p sx={{ textAlign: "center" }}>Minst 4 tecken.</Styled.p>
            </div>
          </div>

          <div sx={{ width: "50%", mx: "auto", fontSize: 5 }}>
            <Input onChange={e => setName(e.target.value)} />
          </div>
          {loading ? (
            <div sx={{ mx: "auto", my: 6 }}>
              <Spinner size={60} />
            </div>
          ) : (
            <div sx={{ mx: " auto" }}>
              <button
                sx={{
                  fontSize: 5,
                  my: 7,
                  px: 6,
                  py: 4,
                  bg: "primary",
                  opacity: name.length > 3 ? 1 : 0.5,
                  color: "background",
                  borderRadius: 8,
                  fontFamily: "heading",
                  fontWeight: "heading",
                }}
                onClick={() =>
                  register(
                    user.sub,
                    name,
                    user.given_name,
                    user.family_name,
                    user.email
                  )
                }
                disabled={name.length > 3 ? false : true}
              >
                Slutför registrering
              </button>
            </div>
          )}
        </div>
      ) : (
        <div sx={{ textAlign: "center", my: 11 }}>
          <Spinner size={60} />
        </div>
      )}
    </Layout>
  )
}

export default AuthPage
