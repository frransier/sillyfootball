export default {
  name: "match",
  type: "document",
  title: "Match",
  fields: [
    {
      name: "home",
      type: "reference",
      to: [{ type: "team" }],
      title: "Home team",
    },
    {
      name: "homeGoals",
      type: "number",
      title: "Home Goals",
    },
    {
      name: "away",
      type: "reference",
      to: [{ type: "team" }],
      title: "Away team",
    },
    {
      name: "awayGoals",
      type: "number",
      title: "Away Goals",
    },
    {
      name: "events",
      type: "array",
      of: [{ type: "event" }],
    },
    {
      name: "matchday",
      type: "reference",
      to: [{ type: "matchday" }],
      title: "Matchday",
    },
    {
      name: "start",
      type: "datetime",
      title: "Start date",
    },
    { name: "elapsed", type: "number", title: "Elapsed" },
    { name: "status", type: "string", title: "Status" },
  ],
  preview: {
    select: {
      home: "home.fullName",
      away: "away.fullName",
      date: "start",
    },
    prepare(selection) {
      const { home, away, date } = selection;
      const dateObj = new Date(date);
      const day = dateObj.toLocaleDateString();

      return {
        title: `${home} vs ${away}`,
        subtitle: day,
      };
    },
  },
};
