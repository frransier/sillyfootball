const sanityClient = require("@sanity/client");
const keys = require("../keys.js");
const fs = require("fs");
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token: keys.sanity,
  useCdn: false,
});

Matches();
Scores();

function Matches() {
  const matchesQuery = `*[_type == 'match' && matchday->status == "current"]`;
  client.fetch(matchesQuery).then((matches) => {
    fs.writeFileSync("../data/matches.json", JSON.stringify(matches));
  });
}

function Scores() {
  const scoresQuery = `*[_type == 'score' && matchday->status == "current"]`;
  client.fetch(scoresQuery).then((scores) => {
    fs.writeFileSync("../data/scores.json", JSON.stringify(scores));
  });
}
