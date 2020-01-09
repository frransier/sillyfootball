module.exports = {
  siteMetadata: {
    title: `Sillyfootball`,
    description: `Senaste fotbollsnyheter, livescore, resultat, transfers och rykten från den europeiska toppfotbollen. Snabbast växande fantasy i Sverige.`,
    author: `@sillyfootballse`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        projectId: "pqn91l0l",
        dataset: "main",
        // token: "",
        // watchMode: true,
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
    // `gatsby-plugin-offline`,
  ],
}
