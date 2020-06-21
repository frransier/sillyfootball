const axios = require("axios");
const keys = require("../keys.js");
const headers = {
  "X-RapidAPI-Key": keys.rapidApiKey,
  "X-RapidAPI-Host": keys.rapidApiHost,
};

const premierLeague = 524;
const laLiga = 775;
const serieA = 891;
const bundesliga = 754;

Run();

async function Run() {
  const leagues = await getFixtures(bundesliga);
  const matches = leagues.api.fixtures.map((x) => ({
    id: x.fixture_id,
    home: x.homeTeam.team_name,
    away: x.awayTeam.team_name,
    date: x.event_date,
  }));
  console.log(matches);
}

function getFixtures(leagueId) {
  return axios
    .get(
      `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${leagueId}/next/${20}
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
