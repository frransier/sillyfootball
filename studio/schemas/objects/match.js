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
    {
      name: "competition",
      type: "string",
      title: "Competition",
      options: {
        list: [
          { title: "Premier League", value: "en" },
          { title: "Serie A", value: "it" },
          { title: "Bundesliga", value: "de" },
          { title: "La Liga", value: "es" },
          { title: "Ligue 1", value: "fr" },
          { title: "Champions League", value: "cl" },
          { title: "Europa League", value: "el" },
          { title: "Allsvenskan", value: "se" },
          { title: "Eredivisie", value: "nl" }
        ], // <-- predefined values
        layout: "radio",
        direction: "horizontal"
      }
    },
    { name: "events", type: "array", of: [{ type: "event" }] },

    { name: "elapsed", type: "number", title: "Elapsed" },
    { name: "status", type: "string", title: "Status" },
    { name: "score", type: "matchScore", title: "Score" },
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
