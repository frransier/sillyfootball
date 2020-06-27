const axios = require("axios");
const sanityClient = require("@sanity/client");
const keys = require("../keys.js");
const fs = require("fs");
const dayjs = require("dayjs");
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token: keys.sanity,
  useCdn: false,
});
const headers = {
  "X-RapidAPI-Key": keys.rapidApiKey,
  "X-RapidAPI-Host": keys.rapidApiHost,
};
const matches = JSON.parse(fs.readFileSync("../data/matches.json"));
const scores = JSON.parse(fs.readFileSync("../data/scores.json"));

setInterval(() => {
  matches.forEach((x) => {
    const now = dayjs();
    const start = dayjs(x.start);
    const end = dayjs(x.start).add(125, "minute");
    if (end > now && now > start) {
      console.log("Livescore", x._id);
      Livescore(x);
    }
  });
}, 40000);

async function Livescore(m) {
  const matchId = m._id.replace("-match", "");
  const getMatch = await getFixture(matchId);
  const match = getMatch.api.fixtures[0];
  if (match.statusShort !== "FT") {
    const events =
      match.events && match.events.filter((x) => x.type === "Goal");
    const sanityEvents =
      events &&
      events.map((event, index) => ({
        _type: "event",
        _key: `${event.player_id}-${event.team_id}__${event.assist_id}-${event.team_id}__${index}`,
        elapsed: event.elapsed,
        detail: event.detail,
        goal: event.player,
        assist: event.assist || "No Assist",
        team: {
          _type: "reference",
          _ref: `${event.team_id}-team`,
        },
      }));
    client
      .patch(m._id)
      .set({
        status: match.statusShort.toLowerCase(),
        elapsed: match.elapsed,
        homeGoals: match.goalsHomeTeam,
        awayGoals: match.goalsAwayTeam,
        events: sanityEvents || [],
      })
      .commit();

    if (events) {
      const goals = events.map(
        (event) => `${event.player_id}-${event.team_id}`
      );
      const assists = events
        .map(
          (event) => event.assist_id && `${event.assist_id}-${event.team_id}`
        )
        .filter(Boolean);

      const players = [...new Set([...goals, ...assists])];

      players.forEach((player) => {
        const scoreId = `${player}-${matches[0].matchday._ref}`;

        if (scores.find((x) => x._id === scoreId))
          client
            .patch(scoreId)
            .set({
              goals: goals.filter((x) => x === player).length,
              assists: assists.filter((x) => x === player).length,
            })
            .commit();
      });
    }
  }
}

function getFixture(fixtureId) {
  return axios
    .get(`https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${fixtureId}`, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    });
}
