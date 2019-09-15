export default {
  name: "playmaker",
  type: "document",
  title: "Playmaker",
  fields: [
    {
      name: "phone",
      type: "string",
      title: "Phone"
    },
    {
      name: "email",
      type: "string",
      title: "Email"
    },
    {
      name: "players",
      title: "Players",
      type: "array",
      of: [{ type: "reference", to: { type: "player" } }]
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Created at"
    }
  ]
};
