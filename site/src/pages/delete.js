/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect } from "react"
import { navigate } from "gatsby"
import axios from "axios"
import { Spinner } from "@theme-ui/components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/footer"
import Button from "../components/button"
import { useUserState } from "../state"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  useCdn: false,
})

const DeletePage = () => {
  const userState = useUserState()
  const [loading, setLoading] = useState(false)
  const [matchday, setMatchday] = useState()
  useEffect(() => {
    const query = `*[_type == 'matchday' && status == 'current']{_id, entries}`
    client.fetch(query).then(matchday => {
      setMatchday(matchday[0])
    })
  }, [])

  function deleteEntry() {
    setLoading(true)
    const entry = userState && {
      user: userState._id,
      matchday: matchday._id,
      entries: matchday.entries,
    }

    axios
      .post("/.netlify/functions/delete", {
        params: { entry },
      })
      .then(res => {
        res.data === "OK" ? navigate("/account/") : navigate("/404/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Regler" />
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          mx: 5,
        }}
      >
        {loading ? (
          <Spinner size={60} />
        ) : (
          <div>
            <Styled.h1 sx={{ textAlign: "center" }}>Är du säker?</Styled.h1>
            <div sx={{ display: "flex" }}>
              <div sx={{ mx: 6 }}>
                <button
                  sx={{
                    fontSize: 5,
                    width: 120,
                    my: 7,
                    mx: "auto",
                    py: 4,
                    bg: "primary",
                    color: "background",
                    border: "none",
                    borderRadius: 2,
                    fontFamily: "heading",
                    fontWeight: "heading",
                    appearance: "none",
                    cursor: "pointer",
                    outline: "none",
                    ":active, :after": {
                      color: "text",
                      bg: "background",
                    },
                  }}
                  onClick={() => deleteEntry()}
                >
                  Ja
                </button>
              </div>
              <div sx={{ mx: 6 }}>
                <Button text="Nej" action="account" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  )
}
export default DeletePage
