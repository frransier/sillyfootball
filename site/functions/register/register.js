const sanityClient = require("@sanity/client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: process.env.SANITY_ENV,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})
exports.handler = (event, _, callback) => {
  var body = JSON.parse(event.body)
  var data = body.params
  console.log(JSON.stringify(data.email))

  const players = data.squad.map(player => {
    const p = { _ref: player, _key: player, _type: "reference" }
    return p
  })

  const doc = {
    _type: "user",
    phone: data.phone,
    email: data.email,
    createdAt: new Date(),
    players: players,
  }

  try {
    sanity.create(doc)
    console.log("Player registered ")

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
