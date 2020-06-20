/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useGlobalState, useGlobalDispatch } from "../state"
import { useEffect, useState, Fragment } from "react"
import Loading from "../components/molecules/loading"
import Heading from "../components/molecules/heading"
import Container from "../components/atoms/container"
import { navigate } from "gatsby"
import { FaCheckCircle, FaRegCircle, FaTimesCircle } from "react-icons/fa"
import axios from "axios"
import Button from "../components/atoms/button"

const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false
})

const ManagePage = () => {
  const [users, setUsers] = useState(null)
  const [friends, setFriends] = useState(null)
  const [hasChanged, setHasChanged] = useState(false)
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()

  // useEffect(() => {
  //   console.log(friends)
  // }, [friends])
  useEffect(() => {
    UpdateUser().then(() => GetUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function UpdateUser() {
    const query = `*[_type == "user" && auth0Id == $auth0Id][0]`
    const params = { auth0Id: state.user.auth0Id }
    const uzr = await client.fetch(query, params)
    dispatch({ type: "set-user", payload: uzr })
  }

  async function GetUsers() {
    if (state) {
      const friendsQuery = `*[_type == 'user']{_id, name} | order(lower(name), desc)`
      const res = await client.fetch(friendsQuery)
      const frnds = state.user.friends.map(x => res.find(y => y._id === x._ref))
      setUsers(res)
      setFriends(frnds)
    }
  }

  function AddFriend(usr) {
    if (!hasChanged) setHasChanged(true)
    setFriends([...friends, usr])
  }
  function RemoveFriend(frnd) {
    if (!hasChanged) setHasChanged(true)
    setFriends(friends.filter(x => x._id !== frnd._id))
  }

  function SetFriends() {
    setUsers(null)
    const params = {
      user: state.user._id,
      friends: friends
    }

    axios
      .post("/.netlify/functions/set-friends", params)
      .then(res => {
        res.data === "OK"
          ? UpdateUser().then(() => navigate("/account/"))
          : console.log("nay")
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO title="Manage Friends" />
      {users === null && <Loading />}
      <Container>
        {users && friends && (
          <Fragment>
            <div sx={{ width: "50%", mx: "auto" }}>
              <Button
                disable={!hasChanged}
                dispatch={() => SetFriends()}
                fontSize={[2, 2]}
              >
                Save Changes
              </Button>
            </div>

            <Container columns="50% 50%">
              <div sx={{ justifySelf: "center" }}>
                <Heading main="Users" />

                {users.map((user, i) => (
                  <div>
                    <button
                      key={i}
                      sx={{
                        cursor: "pointer",
                        appearance: "none",
                        outline: "none",
                        border: "none",
                        width: "100%",
                        bg: "background",
                        justifySelf: "center",
                        my: 4
                        // py: 2
                      }}
                      onClick={() => AddFriend(user)}
                      disabled={friends.find(x => x._id === user._id)}
                    >
                      <div
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "20% 80%",
                          color: "text",
                          alignItems: "center",
                          justifyItems: "center"
                        }}
                      >
                        <div
                          sx={{
                            color: friends.find(x => x._id === user._id)
                              ? "secondary"
                              : "lightgrey",
                            // alignSelf: "center",
                            // justifySelf: "start"
                            height: 16
                          }}
                        >
                          {friends.find(x => x._id === user._id) ? (
                            <FaCheckCircle size={16} />
                          ) : (
                            <FaRegCircle size={16} />
                          )}
                        </div>

                        <Styled.p
                          sx={{
                            alignSelf: "center",
                            justifySelf: "start",
                            textAlign: "left",
                            fontWeight: 500,
                            mx: 2
                          }}
                        >
                          {user.name}
                        </Styled.p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              <div sx={{ justifySelf: "center" }}>
                <Heading main="Friends" />

                {friends.map((friend, i) => (
                  <div>
                    <button
                      key={i}
                      sx={{
                        cursor: "pointer",
                        appearance: "none",
                        outline: "none",
                        border: "none",
                        width: "100%",
                        bg: "background",
                        my: 4
                        // py: 2
                      }}
                      onClick={() => RemoveFriend(friend)}
                    >
                      <div
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "20% 80%",
                          color: "text",
                          alignItems: "center",
                          justifyItems: "center"
                        }}
                      >
                        {/* <div
                          sx={{
                            color: "secondary",
                            // alignSelf: "center",
                            // justifySelf: "center",
                            height: 16
                          }}
                        > */}
                        <FaTimesCircle size={16} />
                        {/* </div> */}

                        <Styled.p
                          sx={{
                            alignSelf: "center",
                            justifySelf: "start",
                            textAlign: "left",
                            fontWeight: 500,
                            mx: 3
                          }}
                        >
                          {friend.name}
                        </Styled.p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </Container>
          </Fragment>
        )}
      </Container>
    </Layout>
  )
}

export default ManagePage
