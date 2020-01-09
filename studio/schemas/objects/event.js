import { FaBell } from "react-icons/fa";
export default {
  name: "event",
  type: "object",
  title: "Event",
  fields: [
    {
      name: "type",
      type: "string",
      title: "Type"
    },
    {
      name: "elapsed",
      type: "number",
      title: "Elapsed"
    },
    {
      name: "player",
      type: "reference",
      to: { type: "player" },
      title: "Player"
    },
    { name: "team", type: "reference", to: [{ type: "team" }], title: "Team" },
    {
      name: "assist",
      type: "reference",
      to: [{ type: "player" }],
      title: "Assist"
    },
    { name: "detail", type: "string", title: "Detail" }
  ],
  preview: {
    select: {
      name: "type"
    },
    prepare(selection) {
      const { name, team } = selection;
      return {
        title: name,
        media: FaBell
      };
    }
  }
};
