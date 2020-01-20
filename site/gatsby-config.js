require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  siteMetadata: {
    title: "Sillyfootball",
    description: "Addera spänning till din fotbollsvardag, helt gratis.",
    author: "@sillyfootballse",
    siteUrl: "https://www.sillyfootball.se",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-well-known`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "0jt5x7hu",
        dataset: "main",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sillyfootball`,
        short_name: `Sillyfootball`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/manifest.svg`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-156458502-1",
        head: false,
      },
    },
    {
      resolve: "gatsby-plugin-intercom-spa",
      options: {
        app_id: "entknhmw",
        include_in_development: false,
        delay_timeout: 0,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/account/`, `/auth0_callback/`, `/thanks/`],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.sillyfootball.se",
        sitemap: "https://www.sillyfootball.se/sitemap.xml",
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/account/", `/auth0_callback/`, `/thanks/`],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-html-attributes",
      options: {
        lang: "sv",
      },
    },
  ],
}
