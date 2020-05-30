export default {
  name: "player",
  type: "document",
  title: "Players",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "fullName",
      type: "string",
      title: "Full name",
    },
    { name: "team", type: "reference", to: [{ type: "team" }] },
    { name: "goals", type: "number", title: "Goals" },
    { name: "assists", type: "number", title: "Assists" },
    { name: "points", type: "number", title: "Points" },
    { name: "rate", type: "number", title: "Rate" },
  ],
  preview: {
    select: {
      name: "fullName",
      team: "team.fullName",
    },
    prepare(selection) {
      const { name, team } = selection;
      return {
        title: name,
        subtitle: team,
      };
    },
  },
};
