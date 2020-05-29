/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Fragment } from "react"

const ManagePage = () => {
  //   function AddFriend() {
  //     setLoading(true)
  //     const params = {
  //       user: userState._id,
  //       friend: friend
  //     }
  //     if (add === "invite") {
  //       axios
  //         .post("/.netlify/functions/invite", params)
  //         .then(res => {
  //           res.data === "OK" ? setLoading(false) : console.log("nay")
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     }
  //     if (add === "add") {
  //       const query = `*[_type == 'user' && lower(name) == '${friend}'][0]{_id}`
  //       client.fetch(query).then(x => {
  //         console.log(x)

  //         if (x._id)
  //           axios
  //             .post("/.netlify/functions/add", params)
  //             .then(res => {
  //               res.data === "OK" ? setLoading(false) : console.log("nay")
  //             })
  //             .catch(error => {
  //               console.log(error)
  //             })
  //         else {
  //           setLoading(false)
  //         }
  //       })
  //     }
  //   }
  return (
    <Layout>
      <SEO title="Manage Account" />;
      <div
        sx={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          width: "100%",
          my: 3
        }}
      >
        <div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "start",
            mt: 4
          }}
        >
          <Styled.h1 sx={{ my: 2 }}>Play With Friends</Styled.h1>
          <div sx={{ mx: "auto" }} />
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "white",
              color: "text",
              borderRadius: 3,
              border: "solid 1px",
              borderColor: "darkgrey",
              boxShadow: "4px 4px 4px darkgrey",
              px: 2,
              mx: 2
            }}
            // onClick={() => setAdd("add")}
          >
            <Styled.p sx={{ m: 0, fontWeight: "heading" }}>Add</Styled.p>
          </button>
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "white",
              color: "text",
              borderRadius: 3,
              border: "solid 1px",
              borderColor: "darkgrey",
              boxShadow: "4px 4px 4px darkgrey",
              px: 2,
              mx: 2
            }}
            // onClick={() => setAdd("invite")}
          >
            <Styled.p sx={{ m: 0, fontWeight: "heading" }}>Invite</Styled.p>
          </button>
        </div>
        <div
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Fragment>
            <input
              sx={{
                appearance: "none",
                outline: "none",
                width: "80%",
                py: 3,
                px: 1,
                height: 30,
                my: 2,
                border: "solid 1px",
                borderRadius: 5,
                borderColor: "black",
                fontSize: 3,
                ":focus": {
                  border: "solid 2px red"
                }
              }}
              //   placeholder={add === "add" ? "Enter Username" : "Enter e-mail"}
              //   onChange={e => setFriend(e.target.value.toLowerCase())}
            />
            <button
              sx={{
                cursor: "pointer",
                appearance: "none",
                outline: "none",
                bg: "red",
                color: "white",
                border: "solid 0.05px black",
                borderRadius: 0,
                boxShadow: "4px 4px 4px darkgrey",
                my: 2,
                py: 2,
                px: 2,
                mx: 2
              }}
              //   onClick={() => AddFriend()}
            >
              <Styled.h3 sx={{ m: 0, fontWeight: "heading" }}>
                {/* {add === "add" ? "Add" : "Invite"} */}Invite
              </Styled.h3>
            </button>
          </Fragment>
        </div>
      </div>
    </Layout>
  )
}

export default ManagePage
