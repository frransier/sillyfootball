const axios = require("axios");
const dayjs = require("dayjs");
const keys = require("../keys.js");
const headers = {
  "X-RapidAPI-Key": keys.rapidApiKey,
  "X-RapidAPI-Host": keys.rapidApiHost,
};

const premierLeague = 524;
const laLiga = 775;
const serieA = 891;
const bundesliga = 754;
const faCup = 1063;

Run();
async function Run() {
  // const bajs = await getLeagues("england");
  // console.log(bajs.api.leagues);
  const getMatches = await getFixtures(serieA);
  const matches = getMatches.api.fixtures.map((x) => ({
    id: x.fixture_id,
    home: x.homeTeam.team_name,
    away: x.awayTeam.team_name,
    date: dayjs(x.event_date).format("dddd MMMM D HH:mm"),
  }));
  console.log(matches);
}

function getFixtures(leagueId) {
  return axios
    .get(
      `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${leagueId}/next/${40}
    `,
      {
        headers: headers,
      }
    )
    .then((response) => {
      return response.data;
    });
}
function getLeagues(name) {
  return axios
    .get(`https://api-football-v1.p.rapidapi.com/v2/leagues/current/${name}`, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    });
}
