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
import axios from "axios"

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
            <button disabled={!hasChanged} onClick={() => SetFriends()}>
              Save
            </button>

            <Container columns="50% 50%">
              <div>
                <Heading main="Friends" />
                {friends.map((friend, i) => (
                  <div
                    key={i}
                    sx={{ mx: 4, my: 2, display: "flex", alignItems: "center" }}
                  >
                    <button onClick={() => RemoveFriend(friend)}>-</button>
                    {/* <div sx={{ mx: "auto" }} /> */}
                    <Styled.p>{friend.name}</Styled.p>
                  </div>
                ))}
              </div>
              <div>
                <Heading main="Users" />
                {users.map((user, i) => (
                  <div
                    key={i}
                    sx={{ mx: 4, my: 2, display: "flex", alignItems: "center" }}
                  >
                    <button
                      disabled={friends.find(x => x._id === user._id)}
                      onClick={() => AddFriend(user)}
                    >
                      +
                    </button>
                    {/* <div sx={{ mx: "auto" }} /> */}
                    <Styled.p>{user.name}</Styled.p>
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
