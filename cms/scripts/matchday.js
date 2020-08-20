const axios = require("axios");
const sanityClient = require("@sanity/client");
const keys = require("../keys.js");
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

const currentMatchday = `*[_type == "matchday" && status == "current"][0]{_id, index}`;
const lastMatchday = `*[_type == "matchday" && status == "previous"][0]{_id, index}`;
const nextMatchday = `*[_type == "matchday" && status == "next"][0]{_id}`;
const currentMatchdayTeams = `*[_type == "team" && current == true]{_id}`;
const nextMatchdayTeams = `*[_type == "team" && next == true]{_id}`;

// const matches = [232853, 232850, 157365, 157372, 157371];
// const matches = [566503, 214392, 214393, 214396, 214399];
// const matches = [157383, 157379, 157378, 232867, 157376];
const matches = [157385];

setMatchdays().then(() => {
  setTimeout(() => {
    client.fetch(nextMatchdayTeams).then((teams) => {
      // console.log("next teams", teams);

      teams.forEach((team) => {
        client.patch(team._id).set({ next: false, current: true }).commit();
      });
      createMatches(matches);
    });
  }, 3000);
});

function createMatches(matchIds) {
  const nextMatchday = `*[_type == 'matchday' && status == "next"][0]{_id}`;
  client.fetch(nextMatchday).then((matchday) => {
    matchIds.forEach(async (matchId) => {
      const fixture = await getFixture(matchId);
      const match = fixture.api.fixtures[0];
      const homeTeam = `${match.homeTeam.team_id}-team`;
      const awayTeam = `${match.awayTeam.team_id}-team`;
      const sanityMatch = {
        _id: `${matchId}-match`,
        _type: "match",
        status: match.statusShort.toLowerCase(),
        start: match.event_date,
        events: [],
        away: {
          _ref: awayTeam,
          _type: "reference",
        },
        home: {
          _ref: homeTeam,
          _type: "reference",
        },
        matchday: {
          _ref: matchday._id,
          _type: "reference",
        },
      };

      client
        .transaction()
        .patch(homeTeam, (p) => p.set({ next: true }))
        .patch(awayTeam, (p) => p.set({ next: true }))
        .createOrReplace(sanityMatch)
        .commit();
    });
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

async function setMatchdays() {
  // await client.fetch(currentMatchday).then((matchday) => {
  //   // console.log("current matchday", matchday);

  //   client.patch(matchday._id).set({ status: "previous" }).commit();
  // });
  // await client.fetch(lastMatchday).then((matchday) => {
  //   // console.log("previous matchday", matchday);
  //   client.patch(matchday._id).set({ status: "archived" }).commit();
  // });
  // await client.fetch(nextMatchday).then((matchday) => {
  //   // console.log("next matchday", matchday);
  //   client.patch(matchday._id).set({ status: "current" }).commit();
  // });

  await client.fetch(currentMatchdayTeams).then((teams) => {
    // console.log("current matchday teams", teams);
    teams.forEach((team) => {
      client.patch(team._id).set({ current: false }).commit();
    });
  });

  // await client.fetch(nextMatchdayTeams).then((teams) =>
  //   teams.forEach((team) => {
  //     client.patch(team._id).set({ next: false, current: true }).commit() ;
  //   })
  // );

  await client.fetch(currentMatchday).then((matchday) => {
    const nextMatchday = {
      _id: `matchday-${matchday.index + 1}`,
      _type: "matchday",
      index: matchday.index + 1,
      prize: 500,
      status: "next",
      title: `Day ${matchday.index + 1}`,
    };
    client.createOrReplace(nextMatchday);
  });
}
