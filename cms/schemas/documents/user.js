export default {
  name: "user",
  type: "document",
  title: "Users",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "average",
      type: "number",
      title: "Average",
    },
    {
      name: "high",
      type: "number",
      title: "High",
    },
    {
      name: "wins",
      type: "number",
      title: "Wins",
    },
    {
      name: "friends",
      title: "Friends",
      type: "array",
      of: [{ type: "reference", to: [{ type: "user" }] }],
    },
    {
      name: "auth0Id",
      title: "Auth0 Id",
      type: "string",
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name,
      };
    },
  },
};
