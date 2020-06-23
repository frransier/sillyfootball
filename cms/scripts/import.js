const axios = require("axios");
const fs = require("fs");
const keys = require("../keys.js");

const headers = {
  "X-RapidAPI-Key": keys.rapidApiKey,
  "X-RapidAPI-Host": keys.rapidApiHost,
};

function getTeams(leagueId) {
  return axios
    .get(
      `https://api-football-v1.p.rapidapi.com/v2/teams/league/${leagueId}/`,
      {
        headers: headers,
      }
    )
    .then((response) => {
      // returning the data here allows the caller to get it through another .then(...)
      return response.data;
    });
}

function getPlayers(teamId) {
  return axios
    .get(
      `https://api-football-v1.p.rapidapi.com/v2/players/team/${teamId}/2019-2020/`,
      {
        headers: headers,
      }
    )
    .then((response) => {
      // returning the data here allows the caller to get it through another .then(...)
      return response.data;
    });
}

(async function () {
  let l1 = await getTeams(525);
  let sa = await getTeams(891);
  let pl = await getTeams(524);
  let ll = await getTeams(775);
  let bl = await getTeams(754);
  let as = await getTeams(1329);
  const teams = [
    ...l1.api.teams,
    ...sa.api.teams,
    ...pl.api.teams,
    ...ll.api.teams,
    ...bl.api.teams,
    ...as.api.teams,
  ];
  // console.log(l1.api.teams[0]);

  const sanityTeams = teams.map((x) => ({
    _type: "team",
    _id: `${x.team_id}-team`,
    fullName: x.name,
    logo: {
      _type: "image",
      _sanityAsset: `image@${x.logo}`,
    },
  }));
  // console.log(sanityTeams[0]);

  const l1Players = l1.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);

    const players = teamPlayers.api.players
      .filter((p) => p.games.appearences > 0 && p.league === "Ligue 1")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });
  const plPlayers = pl.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);

    const players = teamPlayers.api.players
      .filter((p) => p.games.appearences > 0 && p.league === "Premier League")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });
  const saPlayers = sa.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);

    const players = teamPlayers.api.players
      .filter((p) => p.games.appearences > 0 && p.league === "Serie A")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });
  const blPlayers = bl.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);

    const players = teamPlayers.api.players
      .filter((p) => p.games.appearences > 0 && p.league === "Bundesliga")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });
  const llPlayers = ll.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);

    const players = teamPlayers.api.players
      .filter((p) => p.games.appearences > 0 && p.league === "La Liga")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });
  const asPlayers = as.api.teams.map(async function (x) {
    let teamPlayers = await getPlayers(x.team_id);
    const players = teamPlayers.api.players
      .filter((p) => p.league === "Svenska Cupen")
      .map((x) => ({
        _type: "player",
        _id: `${x.player_id}-${x.team_id}`,
        fullName: x.player_name,
        team: getTeam(sanityTeams, x.team_id),
        goals: x.goals.total,
        assists: x.goals.assists,
        points: x.goals.total + x.goals.assists,
        pp90: (x.goals.total + x.goals.assists) / (x.games.minutes_played / 90),
      }));
    return players;
  });

  // let players = [];

  const players = [
    ...l1Players,
    ...plPlayers,
    ...blPlayers,
    ...llPlayers,
    ...saPlayers,
    ...asPlayers,
  ];
  Promise.all(players).then((x) => {
    const flatPlayers = x.flat(Infinity);
    const all = [...sanityTeams, ...flatPlayers];
    fs.writeFileSync(`../data/playerData.json`, JSON.stringify(all));
  });
})();

function getTeam(teams, teamId) {
  const hit = teams.find((t) => t._id === `${teamId}-team`);
  const team = { _ref: hit._id, _key: hit._id, _type: "reference" };
  return team;
}

// cat data.json | jq -c '.[]' > data.ndjson
