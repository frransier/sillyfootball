/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useEffect } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import { useUserDispatch, useLoadingDispatch } from "../state"
import { getProfile, handleAuthentication } from "../utils/auth"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const AuthPage = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [user, setUser] = useState(null)
  const [init, setInit] = useState(false)
  const userDispatch = useUserDispatch()
  const loadingDispatch = useLoadingDispatch()

  useEffect(() => {
    handleAuthentication()
    setTimeout(() => {
      setInit(true)
    }, 500)
  }, [])

  useEffect(() => {
    const usr = getProfile()
    setUser(usr)

    if (usr.sub) {
      const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
      const params = { auth0Id: usr.sub }
      client.fetch(query, params).then(x => {
        console.log(x)

        if (x) {
          userDispatch({ type: "init", user: x })
          navigate("/account/")
        } else {
          setShow(true)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])
  function register() {
    const usr = {
      auth0Id: user.sub,
      name: name,
      firstName: user.given_name || "Fix",
      lastName: user.family_name || "Me",
      email: user.email
    }

    axios
      .post("/.netlify/functions/register", { user: usr })
      .then(res => {
        res.data === "OK" ? getUser() : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }
  function getUser() {
    const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
    const params = { auth0Id: user.sub }
    client.fetch(query, params).then(x => {
      console.log(x)

      if (x) {
        userDispatch({ type: "init", user: x })
        loadingDispatch({ type: "set", loading: true })
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
    </Layout>
  )
}

export default AuthPage
