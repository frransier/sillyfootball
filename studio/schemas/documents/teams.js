export default {
  name: "team",
  type: "document",
  title: "Team",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: "nickName",
      title: "Nickname",
      type: "string"
    },
    {
      name: "active",
      title: "Active",
      type: "boolean"
    },
    {
      name: "index",
      title: "Index",
      type: "number"
    },
    {
      name: "logo",
      type: "image",
      title: "Club logo"
    }
  ]
};
