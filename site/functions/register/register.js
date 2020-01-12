const nanoid = require("nanoid")
const sanityClient = require("@sanity/client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  token:
    "skyWdtvEER4gzvlIRY3aX9iK7Zt6zpa4OjD4q6Sv9X2Vq1RW734doH8aaAs9sGpqkWGyaCdmBx4sDP5SVF40V5FBWv9jYtQBHKQ0Sk38KbUbuHhN9qTU6gDsENy4iXuEaDYdtvoHF7FZ2YXN06DGJEAgiZTxjWsdO6FEyrDFCojjBtOJxHBm",
  useCdn: false,
})

exports.handler = (event, _, callback) => {
  const body = JSON.parse(event.body)
  const data = body.params
  console.log("Starting registration for: ", JSON.stringify(data.user.name))
  const players = data.squad.map(player => {
    const p = { _ref: player.id, _type: "reference", _key: nanoid() }
    return p
  })
  const user = { _ref: data.user.id, _type: "reference" }

  const entry = {
    _type: "entry",
    _key: nanoid(),
    createdAt: new Date(),
    players: players,
    user: user,
  }

  const matchday = data.matchday

  try {
    sanity
      .patch(matchday)
      .setIfMissing({ entries: [] })
      .append("entries", [entry])
      .commit()
    console.log("Player registered in Sanity")

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
