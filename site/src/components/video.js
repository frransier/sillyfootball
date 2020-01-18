import React from "react"
import { Embed } from "@theme-ui/components"

const Video = ({ value }) => {
  const split = value && value.url && value.url.split("/")
  const id = split && split[split.length - 1]
  const url = `https://streamja.com/embed/${id}`
  if (!id) {
    return <div>Missing Youtube url</div>
  }
  return <Embed src={url} sx={{ width: "100%", height: "100%" }} />
}

export default Video
