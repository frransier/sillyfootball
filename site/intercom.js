var Intercom = require("intercom-client")
var intercom = new Intercom.Client({
  token: 
})

// intercom.users.list(function(res) {
//   console.log(JSON.stringify(res.body.users))
// })

intercom.users.find({ email:  }, function(res) {
  const body = res.body
  console.log("Found user: ", body)

  console.log("Log for body.users[0].id: ", body.users[0].id)
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
      id: body.users[0].id,
    },
  }
  console.log("The message object: ", msg)

  intercom.messages.create(
    {
      msg,
    },
    function(res) {
      console.log("Sent email", res.body.errors[0])
    }
  )
  // .catch(err => console.log(err.body.errors[0]))
})
