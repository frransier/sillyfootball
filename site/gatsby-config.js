require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  siteMetadata: {
    title: `Sillyfootball`,
    description: `Fotbollsnyheter, fantasy, livescore, resultat, transfers och rykten från europeisk toppfotboll.`,
    author: `@sillyfootballse`,
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
        icon: `src/images/icon.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-156458502-1", // Google Analytics / GA
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
}
