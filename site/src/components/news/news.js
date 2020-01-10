/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { Link } from "gatsby"

const News = ({ content }) => {
  return (
    <div
      sx={{
        display: "flex",

        alignItems: "center",
        justifyItems: "center",
        height: 90,
        width: "100%",
      }}
    >
      <Link
        style={{ textDecoration: "none" }}
        to={`/${content.tags[0].slug.current}/${
          content.slug.current
        }/${content._createdAt.substr(0, 10)}`}
      >
        <div
          sx={{
            width: 110,
            height: 80,
            border: "solid 2px",
            borderColor: "muted",
            borderRadius: 4,
          }}
        >
          <Image
            sx={{
              borderRadius: 3,
              height: 80,
              width: 110,
            }}
            fixed={content.thumbnail.asset.fixed}
          />
        </div>
      </Link>

      <div
        sx={{
          border: "solid 2px",
          borderColor: "muted",
          height: 80,
          borderRadius: 4,
          ml: 3,

          width: "100%",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={`/${content.tags[0].slug.current}/${
            content.slug.current
          }/${content._createdAt.substr(0, 10)}`}
        >
          <Styled.h3 sx={{ fontSize: [3, 4], mx: 5, mt: 4, mb: 0 }}>
            {content.title}
          </Styled.h3>
        </Link>
        <Styled.p sx={{ fontFamily: "body", fontSize: [2, 3], mx: 5, my: 1 }}>
          {content.intro}
        </Styled.p>

        <div sx={{ display: "flex" }}>
          <div sx={{ mx: "auto" }} />
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[0].slug.current}/`}
          >
            <Styled.h4 sx={{ px: 2, my: 0, mr: 2, textAlign: "right" }}>
              {content.tags[0].title}
            </Styled.h4>
          </Link>
          <Styled.h4 sx={{ px: 2, my: 0, textAlign: "right" }}>|</Styled.h4>
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[1].slug.current}/`}
          >
            <Styled.h4 sx={{ px: 2, my: 0, mr: 4, ml: 2, textAlign: "right" }}>
              {content.tags[1].title}
            </Styled.h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default News
