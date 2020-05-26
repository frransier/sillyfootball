/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useEffect } from "react"
import { useAuth } from "react-use-auth"
import { navigate } from "gatsby"
import axios from "axios"
import { useUserDispatch } from "../state"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false,
})

const AuthPage = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")

  const { user, handleAuthentication } = useAuth()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    if (user.sub) {
      const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
      const params = { auth0Id: user.sub }
      client.fetch(query, params).then(x => {
        if (x) {
          userDispatch({ type: "init", user: x })
          // handleAuthentication({ postLoginRoute: "/account/" })
        } else {
          setShow(true)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  function register() {
    const usr = {
      auth0Id: user.sub,
      name: name,
      firstName: user.given_name || "Fix",
      lastName: user.family_name || "Me",
      email: user.email,
    }

    axios
      .post("/.netlify/functions/register", { user: usr })
      .then(res => {
        res.data === "OK" ? setUser() : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }
  function setUser() {
    const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
    const params = { auth0Id: user.sub }
    client.fetch(query, params).then(x => {
      console.log(x)

      if (x) {
        userDispatch({ type: "init", user: x })
        handleAuthentication({ postLoginRoute: "/fantasy/current/" })
      }
    })
  }
  return (
    <Layout>
      <SEO title="Authenticate" />
      {show && (
        <div>
          <Styled.h3>Välj ett användarnamn</Styled.h3>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={() => register()}>Spara</button>
        </div>
      )}
      {/* {show ? (
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
      )} */}
    </Layout>
  )
}

export default AuthPage
