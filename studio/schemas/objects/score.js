import { IoIosStats } from "react-icons/io";
export default {
  name: "score",
  type: "object",
  title: "Score",
  fields: [
    {
      name: "goals",
      type: "number",
      title: "Goals"
    },
    {
      name: "assists",
      type: "number",
      title: "Assists"
    },
    {
      name: "points",
      type: "number",
      title: "Points"
    },
    { name: "matchday", type: "reference", to: [{ type: "matchday" }] }
  ],
  preview: {
    select: {
      name: "matchday.index",
      goals: "goals",
      assists: "assists"
    },
    prepare(selection) {
      const { name, goals, assists } = selection;
      return {
        title: `Matchday ${name}`,
        media: IoIosStats,
        subtitle: `Goals: ${goals} | Assists: ${assists}`
      };
    }
  }
};
