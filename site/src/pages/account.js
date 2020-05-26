/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useEffect, Fragment } from "react"
import axios from "axios"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ticket from "../components/molecules/ticket"
import Heading from "../components/molecules/heading"
import ReactLoading from "react-loading"
import { useUserDispatch, useUserState } from "../state"
import { useAuth } from "react-use-auth"
import dayjs from "dayjs"
const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  useCdn: false,
})

const AccountPage = () => {
  const [friends, setFriends] = useState(null)
  const [friend, setFriend] = useState("")
  const [add, setAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const userDispatch = useUserDispatch()
  const userState = useUserState()
  const { logout } = useAuth()

  useEffect(() => {
    if (userState.auth0Id) {
      const query = `*[_type == 'ticket' && user->auth0Id == '${userState.auth0Id}' && matchday->status == "current"][0]
        {
          _id,
          matchday->{index, start},
          user->{
            name,
            friends[]->
          },
          scores[]->{
            _id,
            "name": player->name,
            "fullName": player->fullName,
            "teamFullName": player->team->fullName,
            "teamName": player->team->name,
            goals,
            assists,
            rate,
            "points": (goals + assists) * rate,
          },
          "score": ((scores[0]->.goals + scores[0]->.assists) * scores[0]->.rate) +
                  ((scores[1]->.goals + scores[1]->.assists) * scores[1]->.rate) +
                  ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate)
        }`
      client.fetch(query).then(ticket => {
        if (ticket && ticket._id) {
          const friendsHelper =
            ticket.user.friends.length > 0 &&
            ticket.user.friends
              .map(
                (x, i) =>
                  `user->_id == "${x._id}" ${
                    ticket.user.friends.length - 1 > i ? "||" : ""
                  }`
              )
              .join(" ")

          const friendsQuery = `*[_type == 'ticket' && ${friendsHelper} && matchday->status == "current"]
              {
                user->{
                  name,
                  friends[]->
                },
                scores[]->{
                  _id,
                  "name": player->name,
                  "fullName": player->fullName,
                  "teamFullName": player->team->fullName,
                  "teamName": player->team->name,
                  goals,
                  assists,
                  rate,
                  "points": (goals + assists) * rate,
                },
                "score": ((scores[0]->.goals + scores[0]->.assists) * scores[0]->.rate) +
                        ((scores[1]->.goals + scores[1]->.assists) * scores[1]->.rate) +
                        ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate)
              } | order(score desc)[0...10]`
          client.fetch(friendsQuery).then(frnds => {
            setFriends([ticket, ...frnds])
          })
        } else {
          setFriends("play")
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, loading])
  function Logout() {
    userDispatch({ type: "reset" })
    logout()
  }

  function AddFriend() {
    setLoading(true)
    const params = {
      user: userState._id,
      friend: friend,
    }
    if (add === "invite") {
      axios
        .post("/.netlify/functions/invite", params)
        .then(res => {
          res.data === "OK" ? setLoading(false) : console.log("nay")
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (add === "add") {
      const query = `*[_type == 'user' && lower(name) == '${friend}'][0]{_id}`
      client.fetch(query).then(x => {
        console.log(x)

        if (x._id)
          axios
            .post("/.netlify/functions/add", params)
            .then(res => {
              res.data === "OK" ? setLoading(false) : console.log("nay")
            })
            .catch(error => {
              console.log(error)
            })
        else {
          setLoading(false)
        }
      })
    }
  }
  return (
    <Layout>
      <SEO title="Account" />
      <button
        sx={{
          cursor: "pointer",
          height: 30,
          appearance: "none",
          outline: "none",
          my: 1,
        }}
        onClick={() => Logout()}
      >
        <Styled.h6 sx={{ m: 0 }}>Logout</Styled.h6>
      </button>
      {friends === "play" ? (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          {/* <h2>{userState.name}</h2> */}
          <button
            sx={{
              cursor: "pointer",
              appearance: "none",
              outline: "none",
              bg: "red",
              color: "white",
              border: "none",
              borderRadius: 0,
              borderBottom: "solid 4px",
              borderBottomColor: "red",
              boxShadow: "4px 4px 4px darkgrey",
              my: 4,
              py: 2,
              px: 3,
            }}
          >
            <Styled.h2 sx={{ m: 0, textShadow: "2px 2px 2px black" }}>
              Play Matchday #X
            </Styled.h2>
          </button>
        </div>
      ) : friends === null ? (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <ReactLoading type="bars" color="red" height={35} width={35} />
        </div>
      ) : (
        <Fragment>
          <Styled.h2>Personal Leaderboard</Styled.h2>
          <Heading
            main={`Matchday #${friends[0].matchday.index}`}
            sub3="Points"
          />
          {friends.map((x, i) => (
            <Ticket
              key={i}
              ticket={x}
              index={i}
              disabled={
                i === 0 || dayjs() > dayjs(friends[0].matchday.start)
                  ? false
                  : true
              }
            />
          ))}
          <div
            sx={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              width: "100%",
              my: 3,
            }}
          >
            <div
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "start",
                mt: 4,
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
                  mx: 2,
                }}
                onClick={() => setAdd("add")}
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
                  mx: 2,
                }}
                onClick={() => setAdd("invite")}
              >
                <Styled.p sx={{ m: 0, fontWeight: "heading" }}>Invite</Styled.p>
              </button>
            </div>
            <div
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {add && (
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
                        border: "solid 2px red",
                      },
                    }}
                    placeholder={
                      add === "add" ? "Enter Username" : "Enter e-mail"
                    }
                    onChange={e => setFriend(e.target.value.toLowerCase())}
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
                      mx: 2,
                    }}
                    onClick={() => AddFriend()}
                  >
                    {loading ? (
                      <ReactLoading
                        type="bars"
                        color="white"
                        height={18}
                        width={24}
                      />
                    ) : (
                      <Styled.h3 sx={{ m: 0, fontWeight: "heading" }}>
                        {add === "add" ? "Add" : "Invite"}
                      </Styled.h3>
                    )}
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          <button
            sx={{
              cursor: "pointer",
              height: 30,
              appearance: "none",
              outline: "none",
              my: 1,
            }}
            onClick={() => Logout()}
          >
            <Styled.h6 sx={{ m: 0 }}>Logout</Styled.h6>
          </button>
        </Fragment>
      )}
    </Layout>
  )
}

export default AccountPage

// export const query = graphql`

// `
