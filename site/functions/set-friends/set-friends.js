const sanityClient = require("@sanity/client")
// const Intercom = require("intercom-client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token: process.env.SANITY,
  useCdn: false
})

// const intercom = new Intercom.Client({
//   token: process.env.INTERCOM,
// })

exports.handler = (event, _, callback) => {
  const data = JSON.parse(event.body)

  const friends = data.friends.map(friend => ({
    _type: "reference",
    _ref: friend._id,
    _key: friend._id
  }))
  try {
    sanity
      .patch(data.user)
      .setIfMissing({ friends: [] })
      .set({ friends: friends })
      .commit()
      .then(() => console.log("Friends Updated"))
      .catch(e => console.log(e))

    callback(null, {
      statusCode: 200,
      body: `OK`
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
