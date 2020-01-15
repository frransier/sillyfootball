import { GiSoccerField } from "react-icons/gi";
export default {
  name: "match",
  type: "object",
  title: "Match",
  fields: [
    {
      name: "home",
      type: "matchTeam",
      title: "Home team"
    },
    {
      name: "away",
      type: "matchTeam",
      title: "Away team"
    },
    { name: "events", type: "array", of: [{ type: "event" }] },

    { name: "elapsed", type: "number", title: "Elapsed" },
    { name: "status", type: "string", title: "Status" },
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
    { name: "id", type: "string", title: "Id" }
  ],
  preview: {
    select: {
      home: "home.team.fullName",
      away: "away.team.fullName",
      date: "start"
    },
    prepare(selection) {
      const { home, away, date } = selection;
      const dateObj = new Date(date);
      const day = dateObj.toLocaleDateString();

      return {
        title: `${home} vs ${away}`,
        media: GiSoccerField,
        subtitle: day
      };
    }
  }
};
