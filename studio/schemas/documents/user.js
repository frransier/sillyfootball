import { FaUserAstronaut } from "react-icons/fa";
export default {
  name: "user",
  type: "document",
  title: "Users",
  icon: FaUserAstronaut,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
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
      name: "name"
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
