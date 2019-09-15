export default {
  name: "player",
  type: "document",
  title: "Player",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: "image",
      type: "image",
      title: "Image"
    },
    { name: "team", type: "reference", to: [{ type: "team" }] },
    { name: "goals", type: "number", title: "Goals" },
    { name: "assists", type: "number", title: "Assists" },
    { name: "points", type: "number", title: "Points" },
    { name: "minutes", type: "number", title: "Minutes" },
    { name: "games", type: "number", title: "Games" },
    { name: "id", type: "number", title: "Identifier" }
  ]
};
