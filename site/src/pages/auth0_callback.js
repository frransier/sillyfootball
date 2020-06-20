/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useEffect } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import { useGlobalDispatch } from "../state"
import { useAuth0 } from "../state/auth0"
import Button from "../components/atoms/button"
import Container from "../components/atoms/container"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const AuthPage = () => {
  const [show, setShow] = useState(false)
  const [taken, setTaken] = useState(false)
  const [name, setName] = useState("")
  const { user, handleAuthentication } = useAuth0()
  const dispatch = useGlobalDispatch()

  useEffect(() => {
    setTaken(false)
  }, [name])

  useEffect(() => {
    console.log(user)

    if (user) {
      const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
      const params = { auth0Id: user.sub }
      client.fetch(query, params).then(usr => {
        if (usr) {
          dispatch({ type: "set-user", payload: usr })
          navigate("/account/")
        } else {
          setShow(true)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  function register() {
    setTaken(false)
    const userCheck = `*[_type == 'user' && lower(name) == '${name.toLowerCase()}'][0]`
    client.fetch(userCheck).then(x => {
      if (x) setTaken(true)
      else {
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
            res.data === "OK" ? setUser() : navigate("/404/")
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }
  function setUser() {
    const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
    const params = { auth0Id: user.sub }
    client.fetch(query, params).then(usr => {
      if (usr) {
        dispatch({ type: "set-user", payload: usr })
        dispatch({ type: "set-loading", payload: true })
        handleAuthentication({ postLoginRoute: "/fantasy/current/" })
      }
    })
  }
  return (
    <Layout>
      <SEO title="Authenticate" />
      {show && (
        <Container>
          <div sx={{ display: "grid", justifyItems: "center" }}>
            <Styled.h3 sx={{ my: 4 }}>Username</Styled.h3>
            <input
              sx={{
                borderRadius: 4,
                border: "solid 2px",
                borderColor: "red",
                my: 4,
                py: 3,
                px: 4,
                bg: "none",
                fontFamily: "body",
                outline: "none"
              }}
              type="text"
              name="username"
              id="username"
              placeholder="Minimum 3 characters"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            {name.length > 2 && (
              <div sx={{ my: 4 }}>
                <Button dispatch={() => register()} fontSize={[2, 2]}>
                  CONTINUE
                </Button>
              </div>
            )}
            {taken && <Styled.p sx={{}}>Username taken. Try another</Styled.p>}
          </div>
        </Container>
      )}
    </Layout>
  )
}

export default AuthPage
