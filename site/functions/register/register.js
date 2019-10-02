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
  console.log(JSON.stringify(data.squad))
  const datum = Math.floor(Date.now() / 1000)

  const players = data.squad.map(player => {
    const p = { _ref: player.id, _key: player.id, _type: "reference" }
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
          created_at: datum,
          email: data.email,
          metadata: {
            player_1: data.squad[0].name,
            player_2: data.squad[1].name,
            player_3: data.squad[2].name,
            player_4: data.squad[3].name,
            player_5: data.squad[4].name,
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
