import { FaMoon } from "react-icons/fa";
export default {
  name: "season",
  type: "object",
  title: "Season",
  fields: [
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
    },
    {
      name: "points",
      type: "number",
      title: "Points"
    },
    {
      name: "index",
      type: "number",
      title: "Index"
    }
  ],
  preview: {
    select: {
      name: "index",
      gold: "gold",
      silver: "silver",
      bronze: "bronze"
    },
    prepare(selection) {
      const { name, gold, silver, bronze } = selection;
      return {
        title: `Season ${name}`,
        media: FaMoon,
        subtitle: `${gold} gold | ${silver} silver | ${bronze} bronze`
      };
    }
  }
};
