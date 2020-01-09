/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { Link } from "gatsby"

const Hero = ({ content }) => {
  return (
    <div
      sx={{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <div
        sx={{
          width: "100%",
          border: "solid 2px",
          borderColor: "muted",
          borderRadius: 9,
        }}
      >
        <Image
          sx={{ width: "100%", borderRadius: 8 }}
          fluid={content.image.asset.fluid}
        />
      </div>
      <div sx={{ display: "flex", alignItems: "center", justifySelf: "start" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/${content.tags[0].slug.current}/`}
        >
          <div
            sx={{
              fontFamily: "body",
              fontSize: 4,
              mr: 4,
              color: "text",
            }}
          >{`${content.tags[0].title} |`}</div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to={`/${content.tags[0].slug.current}/${
            content.slug.current
          }/${content._createdAt.substr(0, 10)}`}
        >
          <Styled.h1
            sx={{
              borderBottom: "solid 2px",
              borderBottomColor: "primary",
              my: 6,
              pb: 2,
            }}
          >
            {content.title}
          </Styled.h1>
        </Link>
      </div>
    </div>
  )
}

export default Hero
