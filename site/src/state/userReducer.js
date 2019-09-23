const userReducer = (state, action) => {
  switch (action.type) {
    case "sort":
      if (action.data) {
        const players = action.data.map(x => {
          const points = x.players.map(p => p.matchPoints)
          const total = points.reduce((a, b) => a + b, 0)

          return { ...x, score: total }
        })
        const logg = players.sort((a, b) => b.score - a.score)
        return logg
      }
      break
    default:
      return state
  }
}

export default userReducer
