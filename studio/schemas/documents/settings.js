export default {
  name: "settings",
  type: "document",
  title: "Settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "SEO description"
    },
    {
      name: "keywords",
      type: "array",
      description: "SEO keywords",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    }
  ]
};
