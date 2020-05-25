export default {
  name: "ticket",
  type: "document",
  title: "Ticket",
  fields: [
    {
      name: "user",
      type: "reference",
      to: { type: "user" },
      title: "User",
    },
    {
      name: "matchday",
      type: "reference",
      to: { type: "matchday" },
      title: "Matchday",
    },
    {
      name: "scores",
      type: "array",
      of: [{ type: "reference", to: { type: "score" } }],
    },
  ],
  preview: {
    select: {
      name: "user.name",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name,
      };
    },
  },
};
