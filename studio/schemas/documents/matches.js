export default {
  name: "matches",
  type: "document",
  title: "Matches",
  fields: [
    {
      name: "teams",
      type: "array",
      of: [{ type: "team" }]
    }
  ]
};
