const short = require("short-uuid")
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
  const body = JSON.parse(event.body)
  const data = body.params
  console.log("Starting registration for: ", JSON.stringify(data.email))
  const datum = Math.floor(Date.now() / 1000)
  const userId = short.generate()

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

  const mailToExistingUser = id => {
    const msg = {
      message_type: "email",
      subject: "Du är reggad",
      template: "personal",
      body:
        " " +
        "<html>  " +
        "<body>  " +
        "<h1>  " +
        "<b> Spelstart <mark>Lördag kl 13.25</mark> </b> " +
        "</h1> " +
        "<p>Brighton - Tottenham<br>  " +
        "</p>  " +
        "<h2>  " +
        "Ditt lag:" +
        "</h2>  " +
        "<ul>  " +
        `<li>${data.squad[0].name}</li>  ` +
        `<li>${data.squad[1].name}</li>  ` +
        `<li>${data.squad[2].name}</li>  ` +
        `<li>${data.squad[3].name}</li>  ` +
        `<li>${data.squad[4].name}</li>  ` +
        "</ul>  " +
        "<h2>  " +
        "</body>  " +
        "</html>",
      from: {
        type: "admin",
        id: 3501419,
      },
      to: {
        type: "user",
        id: id,
      },
    }

    intercom.messages
      .create({
        msg,
      })
      .then(() => {
        console.log("Sent email to: ", data.email)
      })
      .catch(err => console.log(err))
  }

  try {
    sanity.create(doc)
    console.log("Player registered in Sanity")

    intercom.users.find({ email: data.email }, function(res) {
      const usr = res.body.users
      console.log(JSON.stringify(usr))

      if (usr.length > 0) {
        mailToExistingUser(usr[0].user_id)
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
            console.log("Team created in Intercom")
          })
      } else {
        intercom.users
          .create({
            email: data.email,
            user_id: userId,
            custom_attributes: {
              player_1: data.squad[0].name,
              player_2: data.squad[1].name,
              player_3: data.squad[2].name,
              player_4: data.squad[3].name,
              player_5: data.squad[4].name,
            },
          })
          .then(() => {
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
                console.log("User created: ", data.email)
              })
          })
      }
    })

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
