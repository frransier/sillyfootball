require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  siteMetadata: {
    title: `Silly Football`,
    description: `Fantasy Football games can be complicated. Silly Football is not. Play for free against others & your friends.`,
    author: `@sillyfootballse`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "0jt5x7hu",
        dataset: "production"
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-intercom-spa",
      options: {
        app_id: "entknhmw",
        include_in_development: false,
        delay_timeout: 4
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/primary.png` // This path is relative to the root of the site.
      }
    }
  ]
}
