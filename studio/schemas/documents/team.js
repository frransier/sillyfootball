export default {
  name: "team",
  type: "document",
  title: "Teams",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "logo",
      type: "image",
      title: "Logo"
    },
    {
      name: "active",
      type: "boolean",
      title: "Active"
    },
    {
      name: "fullName",
      type: "string",
      title: "Full Name"
    },
    {
      name: "id",
      type: "number",
      title: "Id"
    }
  ],
  preview: {
    select: {
      name: "fullName",
      logo: "logo"
    },
    prepare(selection) {
      const { name, logo } = selection;
      return {
        title: name,
        media: logo
      };
    }
  }
};
