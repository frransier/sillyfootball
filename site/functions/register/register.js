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
  const body = JSON.parse(event.body)
  const user = body.user
  console.log("Starting registration for: ", JSON.stringify(user.name))
  const sanityUser = {
    _type: "user",
    name: user.name,
    auth0Id: user.auth0Id,
    friends: [],
  }
  //   const intercomUser = {
  //     email: user.email,
  //     user_id: user.auth0Id,
  //     name: `${user.firstName} ${user.lastName}`,
  //     custom_attributes: {
  //       nickname: user.name,
  //     },
  //   }

  try {
    sanity
      .create(sanityUser)
      .then(x => {
        // intercom.users
        //   .create(intercomUser)
        //   .then(x => console.log(`${user.name} registered in Intercom`))
        //   .catch(e => console.log(e))
        console.log(x)
      })
      .catch(e => console.log(e))

    callback(null, {
      statusCode: 200,
      body: `OK`,
    })
  } catch (err) {
    callback(null, { statusCode: 500, body: err.toString() })
  }
}
