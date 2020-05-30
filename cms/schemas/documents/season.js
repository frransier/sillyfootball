export default {
  name: "season",
  type: "document",
  title: "Season",
  fields: [
    {
      name: "matchdays",
      type: "array",
      of: [{ type: "reference", to: { type: "matchday" } }],
      title: "Matchdays",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
  ],
  preview: {
    select: {
      name: "index",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name,
      };
    },
  },
};
