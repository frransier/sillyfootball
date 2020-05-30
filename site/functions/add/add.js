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

  const query = `*[_type == 'user' && lower(name) == '${data.friend}'][0]{_id}`

  try {
    sanity.fetch(query).then(x => {
      if (x._id) {
        const cleanup = [`friends[_key=="${x._id}"]`]
        sanity
          .patch(data.user)
          .setIfMissing({ friends: [] })
          .unset(cleanup)
          .append("friends", [{ _type: "reference", _ref: x._id, _key: x._id }])
          .commit()
          .then(x => console.log("Friend added"))
          .catch(e => console.log(e))
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
