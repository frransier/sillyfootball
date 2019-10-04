var Intercom = require("intercom-client")
var client = new Intercom.Client({})

client.users.list(function(res) {
  console.log(JSON.stringify(res.body.users))
})
