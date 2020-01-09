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
  const user = body.user
  console.log(user)

  console.log("Starting registration for: ", JSON.stringify(user.name))

  const doc = {
    _type: "user",
    name: user.name,
    id: user._id,
  }

  try {
    sanity
      .create(doc)
      .then(x => console.log(`${user.name} registered in Sanity`))
      .catch(e => console.log(e))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
