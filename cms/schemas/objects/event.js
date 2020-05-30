export default {
  name: "event",
  type: "object",
  title: "Event",
  fields: [
    {
      name: "elapsed",
      type: "number",
      title: "Elapsed",
    },
    {
      name: "goal",
      type: "reference",
      to: { type: "player" },
      title: "Goal",
    },
    {
      name: "assist",
      type: "reference",
      to: [{ type: "player" }],
      title: "Assist",
    },
    { name: "team", type: "reference", to: [{ type: "team" }], title: "Team" },
  ],
  preview: {
    select: {
      goal: "goal.fullName",
    },
    prepare(selection) {
      const { goal } = selection;
      return {
        title: goal,
      };
    },
  },
};
