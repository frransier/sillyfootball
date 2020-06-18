/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Heading from "./heading"
import { Fragment } from "react"

const Users = ({ users, friends }) => {
  if (users.length === 0) return <Styled.p sx={{ mx: 4 }}>No Friends</Styled.p>
  else
    return (
      <Fragment>
        <Heading main="Find" />
        {users.map((user, i) => (
          <div
            key={i}
            sx={{ mx: 4, my: 2, display: "flex", alignItems: "center" }}
          >
            <button disabled={friends.find(x => x._id === user._id)}>+</button>
            {/* <div sx={{ mx: "auto" }} /> */}
            <Styled.p>{user.name}</Styled.p>
          </div>
        ))}
      </Fragment>
    )
}

export default Users
