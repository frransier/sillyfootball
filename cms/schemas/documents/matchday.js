export default {
  name: "matchday",
  type: "document",
  title: "Matchday",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "index",
      type: "number",
      title: "Index",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Current", value: "current" },
          { title: "Next", value: "next" },
          { title: "Previous", value: "previous" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "prize",
      type: "number",
      title: "Prize",
    },
    {
      name: "deadline",
      type: "datetime",
      title: "Deadline",
    },
  ],
  preview: {
    select: {
      name: "title",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name,
      };
    },
  },
};
