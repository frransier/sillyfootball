import { FaUserAstronaut } from "react-icons/fa";
export default {
  name: "user",
  type: "document",
  title: "Users",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: "alias",
      title: "Alias",
      type: "string"
    },
    {
      name: "id",
      title: "Id",
      type: "string"
    },
    {
      name: "season",
      type: "array",
      of: [{ type: "season" }],
      title: "Seasons"
    }
  ],
  preview: {
    select: {
      name: "alias"
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name,
        media: FaUserAstronaut
      };
    }
  }
};
