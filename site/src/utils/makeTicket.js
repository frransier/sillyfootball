export function makeTicket(ticket) {
  const players = ticket.players.map(y => ({
    name: y.name,
    fullName: y.fullName,
    team: {
      name: y.team.name,
      fullName: y.team.fullName,
    },
    score: ticket.scores.find(z => z._id === y._id),
  }))
  const user = {
    user: ticket.user.name,
    players: players,
    total: players
      .map(x => (x.score ? x.score.points : 0))
      .reduce((a, b) => a + b, 0),
  }
  return user
}
// export function mapEdgesToNodes(data) {
//     if (!data.edges) return []
//     return data.edges.map(edge => edge.node)
//   }
