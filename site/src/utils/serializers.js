/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import BlockContent from "@sanity/block-content-to-react"

export const serializers = {
  types: {
    block: props => {
      if (props.node.style === "h1") {
        return (
          <Styled.h1>{props.node.children.map(child => child.text)}</Styled.h1>
        )
      }
      if (props.node.style === "h2") {
        return (
          <Styled.h2>{props.node.children.map(child => child.text)}</Styled.h2>
        )
      }
      if (props.node.style === "h3") {
        return (
          <Styled.h3>{props.node.children.map(child => child.text)}</Styled.h3>
        )
      }
      if (props.node.style === "normal") {
        return (
          <div
            sx={{
              fontFamily: "body",
              lineHeight: "body",
              fontWeight: "body",
            }}
          >
            {BlockContent.defaultSerializers.types.block(props)}
          </div>
        )
      }
      if (props.node.style === "blockquote") {
        return (
          <blockquote
            sx={{
              fontFamily: "body",
              lineHeight: "body",
              fontWeight: "body",
              fontStyle: "italic",
            }}
          >
            {props.node.children.map(child => child.text)}
          </blockquote>
        )
      } else {
        return (
          <div
            sx={{
              fontFamily: "body",
              lineHeight: "body",
              fontWeight: "body",
            }}
          >
            {BlockContent.defaultSerializers.types.block(props)}
          </div>
        )
      }
    },
  },
}
