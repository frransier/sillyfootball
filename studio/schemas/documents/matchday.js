import { FaGamepad } from "react-icons/fa";
export default {
  name: "matchday",
  type: "document",
  title: "Match days",
  icon: FaGamepad,
  fields: [
    {
      name: "index",
      type: "number",
      title: "Index"
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Current", value: "current" },
          { title: "Next", value: "next" },
          { title: "Last", value: "last" },
          { title: "Finished", value: "finished" }
        ],
        layout: "radio",
        direction: "horizontal"
      }
    },
    {
      name: "prize",
      type: "number",
      title: "Prize"
    },
    {
      name: "entries",
      type: "array",
      of: [{ type: "entry" }]
    },

    {
      name: "matches",
      type: "array",
      of: [{ type: "match" }]
    },
    {
      name: "start",
      type: "datetime",
      title: "Start date"
    },
    {
      name: "end",
      type: "datetime",
      title: "End date"
    },
    {
      name: "gold",
      type: "number",
      title: "Gold"
    },
    {
      name: "silver",
      type: "number",
      title: "Silver"
    },
    {
      name: "bronze",
      type: "number",
      title: "Bronze"
    }
  ],
  preview: {
    select: {
      name: "index",
      entries: "entries"
    },
    prepare(selection) {
      const { name, entries } = selection;
      return {
        title: `Match day ${name}`,
        media: FaGamepad,
        subtitle: entries.length + ` users`
      };
    }
  }
};
