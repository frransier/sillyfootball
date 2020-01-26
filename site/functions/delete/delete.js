const sanityClient = require("@sanity/client")
const sanity = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "main",
  token: process.env.SANITY,
  useCdn: false,
})

exports.handler = (event, _, callback) => {
  const body = JSON.parse(event.body)
  const params = body.params.entry
  console.log("Starting delete for: ", JSON.stringify(params.user))

  const entries = params.entries.filter(x => x.user._ref !== params.user)

  try {
    sanity
      .patch(params.matchday)
      .set({ entries: entries })
      .commit()
      .then(() => console.log("Deleted from entries"))
      .catch(e => console.log(e))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
