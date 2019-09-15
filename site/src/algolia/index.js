const algoliaQuery = `
{
  allSanityPlayer (filter: {team: {index: {ne: null} }}) {
    edges {
      node {
        name
        games
        goals
        assists
        points
        minutes
        team {
            name
            nickName
            index
            id
            logo {
            asset {
                url
            }
            }
        }
      }
    }
  }
}
`

const transform = arr =>
  arr.map(({ node: { goals, assists, minutes, ...rest } }) => ({
    pp90: parseFloat((((goals + assists) * 90) / minutes).toFixed(2)),
    goals: goals,
    assists: assists,
    minutes: minutes,
    ...rest,
  }))

const queries = [
  {
    query: algoliaQuery,
    transformer: ({ data }) => transform(data.allSanityPlayer.edges),
  },
]

module.exports = queries
