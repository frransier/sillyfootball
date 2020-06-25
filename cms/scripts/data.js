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
CurrentTickets();
Users();

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
function CurrentTickets() {
  const currentTicketsQuery = `*[_type == 'ticket' && matchday->status == "current"]{user->{_id}, 
  "score": ((scores[0]->.goals + scores[0]->.assists) * scores[0]->.rate) +
           ((scores[1]->.goals + scores[1]->.assists) * scores[1]->.rate) +
           ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate),}`;
  client.fetch(currentTicketsQuery).then((tickets) => {
    fs.writeFileSync("../data/currentTickets.json", JSON.stringify(tickets));
  });
}
// TODO LAST 3 ROUNDS TICKETS
function Last3Tickets() {
  const last3TicketsQuery = `*[_type == 'ticket' && matchday->status == "current"]{user->{_id}, 
  "score": ((scores[0]->.goals + scores[0]->.assists) * scores[0]->.rate) +
           ((scores[1]->.goals + scores[1]->.assists) * scores[1]->.rate) +
           ((scores[2]->.goals + scores[2]->.assists) * scores[2]->.rate),}`;
  client.fetch(currentTicketsQuery).then((tickets) => {
    fs.writeFileSync("../data/tickets.json", JSON.stringify(tickets));
  });
}
function Users() {
  const usersQuery = `*[_type == 'user']`;
  client.fetch(usersQuery).then((users) => {
    fs.writeFileSync("../data/users.json", JSON.stringify(users));
  });
}
