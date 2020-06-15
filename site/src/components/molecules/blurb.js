/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { RiUserAddLine, RiTeamLine, RiThumbUpLine } from "react-icons/ri"
import { MdLiveTv } from "react-icons/md"

const Blurb = ({ text }) => (
  <div
    sx={{
      display: "grid",
      alignItems: "center",
      justifyItems: "center",
      //   bg: "secondary",
      color: "text",
      width: "100%",
      height: "100%",
      py: 4
      //   borderTop: "solid 1.5px",
      //   borderTopColor: "primary"

      // borderRadius: 13
    }}
  >
    {text === "Follow Live" && <MdLiveTv size={25} />}
    {text === "Pick 3 Players" && <RiTeamLine size={25} />}
    {text === "Get Hooked" && <RiThumbUpLine size={25} />}
    <Styled.p sx={{ my: 4 }}>{text}</Styled.p>
  </div>
)

export default Blurb
