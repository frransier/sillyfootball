/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Image from "gatsby-image"
import { Link } from "gatsby"

const News = ({ content }) => {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateColumns: "110px auto",
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
            width: 100,
            height: 75,
            borderRadius: 2,
          }}
        >
          <Image
            sx={{
              // borderRadius: 3,
              height: 75,
              width: 100,
            }}
            fixed={content.thumbnail.asset.fixed}
            alt={`Nyheter ${content.tags[0].title}`}
          />
        </div>
      </Link>

      <div
        sx={{
          height: 80,
          width: "100%",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={`/${content.tags[0].slug.current}/${
            content.slug.current
          }/${content._createdAt.substr(0, 10)}`}
        >
          <Styled.h3 sx={{ fontSize: [3, 3, 4], mt: 3, mb: 0 }}>
            {content.title}
          </Styled.h3>
        </Link>
        <Styled.p sx={{ fontFamily: "body", fontSize: 2, my: 1 }}>
          {content.intro}
        </Styled.p>

        <div sx={{ display: "flex", mx: 3 }}>
          <div sx={{ mx: "auto" }} />
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[0].slug.current}/`}
          >
            <Styled.h4 sx={{ px: 2, my: 2, mx: 2, textAlign: "right" }}>
              {content.tags[0].title}
            </Styled.h4>
          </Link>
          <Styled.h4 sx={{ px: 2, my: 2, textAlign: "right" }}>|</Styled.h4>
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[1].slug.current}/`}
          >
            <Styled.h4 sx={{ px: 2, my: 2, ml: 2, mr: 2, textAlign: "right" }}>
              {content.tags[1].title}
            </Styled.h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default News
