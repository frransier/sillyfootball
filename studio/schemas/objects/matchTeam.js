export default {
  name: "matchTeam",
  type: "object",
  title: "Team",
  fields: [
    {
      name: "team",
      type: "reference",
      to: { type: "team" },
      title: "Team"
    },
    {
      name: "goals",
      type: "number",
      title: "Goals"
    }
  ]
};
