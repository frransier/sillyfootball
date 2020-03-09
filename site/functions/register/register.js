const nanoid = require("nanoid")
const sanityClient = require("@sanity/client")
const Intercom = require("intercom-client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  token: process.env.SANITY,
  useCdn: false,
})

const intercom = new Intercom.Client({
  token: process.env.INTERCOM,
})

exports.handler = (event, _, callback) => {
  const body = JSON.parse(event.body)
  const data = body.params
  const now = Math.floor(Date.now() / 1000)
  console.log("Starting registration for: ", JSON.stringify(data.user.name))
  const players = data.squad.map(player => {
    const p = { _ref: player.id, _type: "reference", _key: nanoid() }
    return p
  })
  const user = { _ref: data.user._id, _type: "reference" }

  const entry = {
    _type: "entry",
    _key: nanoid(),
    createdAt: new Date(),
    players: players,
    user: user,
  }
  const matchday = data.matchday
  const msg = {
    message_type: "email",
    subject: `${data.user.name} är registrerad`,
    template: "personal",
    body: `
   <html>
    <body>
      <h1>
        <b> Omgång ${matchday.index} | Säsong 4 </b>
      </h1>
      <h1>
        <b> Start: <mark>${matchday.date}</mark> </b>
      </h1>
      <h2>Ditt lag:</h2>
      <ul>
        <li>${data.squad[0].name}</li>
        <li>${data.squad[1].name}</li>
      </ul>
      <h2>
        Följ omgången live på <a href="https://www.sillyfootball.se/highscore/">Highscore</a>
      </h2>
      <h2>
        Och via <a href="https://www.sillyfootball.se/livescore/">Livescore</a>
      </h2>
      <h2>
        Din score uppdateras live på <a href="https://www.sillyfootball.se/account/">Din profil</a>
      </h2>
    </body>
  </html>
   `,
    from: {
      type: "admin",
      id: 3501419,
    },
    to: {
      type: "user",
      user_id: data.user.id,
    },
  }

  try {
    sanity
      .patch(matchday.id)
      .setIfMissing({ entries: [] })
      .append("entries", [entry])
      .commit()
      .then(x => console.log("Entry registered in Sanity"))
      .catch(e => console.log(e.message))
    // intercom.tags
    //   .create({ name: `s01m0${matchday.index}` })
    //   .catch(e => console.log(e))
    intercom.messages
      .create(msg)
      .then(() => {
        console.log("Sent email to: ", data.user.name)
      })
      .catch(err => console.log(err.body.errors[0]))
    intercom.tags
      .tag({
        name: `s04m0${matchday.index}`,
        users: [{ user_id: data.user.id }],
      })
      .catch(e => console.log(e))
    intercom.events
      .create({
        event_name: "Team created",
        created_at: now,
        user_id: data.user.id,
      })
      .then(() => {
        console.log("Team created in Intercom")
      })
    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
