/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Heading from "./heading"
import { Fragment } from "react"

const Friends = ({ friends, setNewFriends }) => {
  if (friends.length === 0)
    return <Styled.p sx={{ mx: 4 }}>No Friends</Styled.p>
  else
    return (
      <Fragment>
        <Heading main="My Friends" />
        {friends.map((friend, i) => (
          <div
            key={i}
            sx={{ mx: 4, my: 2, display: "flex", alignItems: "center" }}
          >
            <button
              onClick={() =>
                setNewFriends(friends.filter(x => x._id !== friend._id))
              }
            >
              -
            </button>
            {/* <div sx={{ mx: "auto" }} /> */}
            <Styled.p>{friend.name}</Styled.p>
          </div>
        ))}
      </Fragment>
    )
}

export default Friends
