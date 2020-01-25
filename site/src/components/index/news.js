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
        py: 3,
        px: [5, 7],
      }}
    >
      <Link
        style={{ textDecoration: "none" }}
        to={`/${content.tags[0].slug.current}/${
          content.slug.current
        }/${content._createdAt.substr(0, 10)}`}
      >
        <Image
          sx={{
            height: 75,
            width: 100,
            p: 0,
          }}
          fixed={content.thumbnail.asset.fixed}
          alt={`Nyheter ${content.tags[0].title}`}
        />
      </Link>
      <div sx={{ display: "grid", gridTemplateRows: "auto", py: 2, pr: 4 }}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/${content.tags[0].slug.current}/${
            content.slug.current
          }/${content._createdAt.substr(0, 10)}`}
        >
          <Styled.h3 sx={{ fontSize: [3], mt: 0, mb: 0 }}>
            {content.title}
          </Styled.h3>
        </Link>
        <Styled.p sx={{ fontFamily: "body", fontSize: 2, my: 1 }}>
          {content.intro}
        </Styled.p>
        <div
          sx={{
            display: "flex",
            alignSelf: "end",
            justifySelf: "end",
            px: 2,
            my: 0,
          }}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[0].slug.current}/`}
          >
            <Styled.h4 sx={{ my: 2, mx: 2, textAlign: "right" }}>
              {content.tags[0].title}
            </Styled.h4>
          </Link>
          <Styled.h4 sx={{ my: 2, textAlign: "right" }}>|</Styled.h4>
          <Link
            style={{ textDecoration: "none" }}
            to={`/${content.tags[1].slug.current}/`}
          >
            <Styled.h4 sx={{ my: 2, mx: 2, textAlign: "right" }}>
              {content.tags[1].title}
            </Styled.h4>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default News
