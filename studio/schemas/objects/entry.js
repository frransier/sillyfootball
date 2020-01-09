import { FaUserAstronaut } from "react-icons/fa";

export default {
  name: "entry",
  type: "object",
  title: "Entry",
  fields: [
    {
      name: "user",
      type: "reference",
      to: { type: "user" },
      title: "User"
    },
    {
      name: "players",
      type: "array",
      of: [{ type: "reference", to: { type: "player" } }]
    }
  ],
  preview: {
    select: {
      name: "user.alias"
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
