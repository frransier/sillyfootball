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
      name: "auth0Id",
      title: "Auth0 Id",
      type: "string",
    },
    {
      name: "friends",
      title: "Friends",
      type: "array",
      of: [{ type: "reference", to: [{ type: "user" }] }],
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
