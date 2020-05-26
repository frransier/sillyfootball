const sanityClient = require("@sanity/client")
// const Intercom = require("intercom-client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token: process.env.SANITY,
  useCdn: false,
})

// const intercom = new Intercom.Client({
//   token: process.env.INTERCOM,
// })

exports.handler = (event, _, callback) => {
  const data = JSON.parse(event.body)

  const scores = data.squad.map(score => ({
    _type: "score",
    _id: score._id,
    goals: 0,
    assists: 0,
    rate: score.rate,
    player: {
      _ref: score._playerRef,
      _type: "reference",
    },
    match: {
      _ref: score._matchRef,
      _type: "reference",
    },
    matchday: {
      _ref: data.matchday._id,
      _type: "reference",
    },
  }))
  // console.log(scores)

  const ticket = {
    _type: "ticket",
    _id: `${data.user._id}-${data.matchday._id}`,
    matchday: {
      _ref: data.matchday._id,
      _type: "reference",
    },
    scores: data.squad.map(score => ({
      _key: score._id,
      _ref: score._id,
      _type: "reference",
    })),
    user: {
      _ref: data.user._id,
      _type: "reference",
    },
  }
  // console.log(ticket)

  try {
    sanity
      .transaction()
      .createIfNotExists(scores[0])
      .createIfNotExists(scores[1])
      .createIfNotExists(scores[2])
      .commit()
      .then(() =>
        sanity.createOrReplace(ticket).then(() => console.log("SUCCESS"))
      )
      .catch(e => console.log(e))
    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
