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
    const end = dayjs(x.start).add(126, "minute");
    if (end > now && now > start) {
      console.log("Livescore", x._id);
      Livescore(x);
    }
  });
}, 40000);

setInterval(() => {
  Cleanup();
}, 247000);

async function Livescore(m) {
  const matchId = m._id.replace("-match", "");
  const getMatch = await getFixture(matchId);
  const match = getMatch.api.fixtures[0];
  const events =
    match.events &&
    match.events
      .filter((x) => x.type === "Goal" && x.detail !== "Missed Penalty")
      .map((event, index) => ({
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
      events: events || [],
    })
    .commit();

  if (match.statusShort !== "HT" && events) {
    const scoreEvents = match.events.filter(
      (x) =>
        x.type === "Goal" &&
        x.detail !== "Missed Penalty" &&
        x.detail !== "Own Goal"
    );

    const goals = scoreEvents.map(
      (event) => `${event.player_id}-${event.team_id}`
    );

    const assists = scoreEvents
      .map((event) => event.assist_id && `${event.assist_id}-${event.team_id}`)
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

async function Cleanup() {
  const currentScoresQuery = `*[_type == 'score' && matchday->status == 'current']{..., player->{_id, fullName}}`;
  const currentMatchesQuery = `*[_type == 'match' && matchday->status == 'current']`;
  const currentScores = await client.fetch(currentScoresQuery);
  const currentMatches = await client.fetch(currentMatchesQuery);
  currentScores.forEach((score) => {
    const hasScored = score.goals + score.assists > 0;
    if (hasScored) {
      const match = currentMatches.find((x) => x._id === score.match._ref);

      const eventKeys = match.events.map((x) => x._key);
      const exists = eventKeys.find((x) => x.includes(score.player._id));
      if (!exists) {
        client
          .patch(score._id)
          .set({ goals: 0, assists: 0 })
          .commit()
          .then(() => console.log("Score corrected: ", score.player.fullName));
      } else {
        console.log(score.player.fullName, " confirmed");
      }
    }
  });
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
