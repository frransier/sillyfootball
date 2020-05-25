export default {
  name: "team",
  type: "document",
  title: "Teams",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "fullName",
      type: "string",
      title: "Full Name",
    },
    {
      name: "next",
      title: "Next Matchday",
      type: "boolean",
    },
    {
      name: "current",
      title: "Current Matchday",
      type: "boolean",
    },
    {
      name: "logo",
      type: "image",
      title: "Club Logo",
    },
  ],
  preview: {
    select: {
      name: "fullName",
      image: "image",
    },
    prepare(selection) {
      const { name, image } = selection;
      return {
        title: name,
        media: image,
      };
    },
  },
};
