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
      type: "string",
      title: "Goal",
    },
    {
      name: "assist",
      type: "string",
      title: "Assist",
    },
    {
      name: "detail",
      type: "string",
      title: "Detail",
    },
    { name: "team", type: "reference", to: [{ type: "team" }], title: "Team" },
  ],
  preview: {
    select: {
      goal: "goal",
      assist: "assist",
    },
    prepare(selection) {
      const { goal, assist } = selection;
      return {
        title: `${goal} | ${assist}`,
      };
    },
  },
};
