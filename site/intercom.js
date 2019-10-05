var Intercom = require("intercom-client")
var intercom = new Intercom.Client({
  token: boho,
})

// intercom.users.list(function(res) {
//   console.log(JSON.stringify(res.body.users))
// })

intercom.users.find({ email: boho }, function(res) {
  const body = res.body
  console.log("Found user: ", body)

  console.log("Log for body.users[0].id: ", body.users[0].user_id)
  const msg = {
    message_type: "email",
    subject: "Du är reggad",
    template: "personal",
    body: "test",
    from: {
      type: "admin",
      id: 3501419,
    },
    to: {
      type: "user",
      user_id: body.users[0].user_id,
    },
  }
  console.log("The message object: ", msg)

  intercom.messages.create(
    {
      msg,
    },
    function(res) {
      console.log("Sent email", res)
    }
  )
  // .catch(err => console.log(err.body.errors[0]))
})
