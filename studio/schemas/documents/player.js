import { FaUserCircle } from "react-icons/fa";

export default {
  name: "player",
  type: "document",
  title: "Players",
  icon: FaUserCircle,
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },

    { name: "team", type: "reference", to: [{ type: "team" }] },
    { name: "goals", type: "number", title: "Goals" },
    { name: "assists", type: "number", title: "Assists" },
    { name: "points", type: "number", title: "Points" },
    { name: "scores", type: "array", of: [{ type: "score" }] },
    {
      name: "fullName",
      type: "string",
      title: "Full name"
    },
    {
      name: "image",
      type: "image",
      title: "Image"
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
      team: "team.fullName"
    },
    prepare(selection) {
      const { name, team } = selection;
      return {
        title: name,
        media: FaUserCircle,
        subtitle: team
      };
    }
  }
};
