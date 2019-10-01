const sanityClient = require("@sanity/client")
const Intercom = require("intercom-client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: process.env.SANITY_ENV,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const intercom = new Intercom.Client({ token: process.env.INTERCOM_TOKEN })

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

    email: data.email,
    createdAt: new Date(),
    players: players,
  }

  try {
    sanity.create(doc)
    console.log("Player registered ")

    intercom.users.create({ email: data.email }).then(() => {
      intercom.events
        .create({
          event_name: "Team created",
          created_at: new Date(),
          email: data.email,
          metadata: {
            player_1: players[0],
            player_2: players[1],
            player_3: players[2],
            player_4: players[3],
            player_5: players[4],
          },
        })
        .then(() => {
          console.log("Success")
        })
    })

    console.log("did it work?")

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
