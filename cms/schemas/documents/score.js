export default {
  name: "score",
  type: "document",
  title: "Score",
  fields: [
    {
      name: "goals",
      type: "number",
      title: "Goals",
    },
    {
      name: "assists",
      type: "number",
      title: "Assists",
    },
    {
      name: "rate",
      type: "number",
      title: "Rate",
    },
    { name: "player", type: "reference", to: [{ type: "player" }] },
    { name: "match", type: "reference", to: [{ type: "match" }] },
    { name: "matchday", type: "reference", to: [{ type: "matchday" }] },
  ],
  preview: {
    select: {
      name: "player.fullName",
      goals: "goals",
      assists: "assists",
      matchdayTitle: "matchday.title",
    },
    prepare(selection) {
      const { name, goals, assists, matchdayTitle } = selection;
      return {
        title: name,
        subtitle: `Goals: ${goals} | Assists: ${assists} | ${matchdayTitle}`,
      };
    },
  },
};
