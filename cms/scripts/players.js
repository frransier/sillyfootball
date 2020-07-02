const { default: PQueue } = require("p-queue");
const sanityClient = require("@sanity/client");
const fs = require("fs");
const keys = require("../keys.js");
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token: keys.sanity,
  useCdn: false,
});
const playerData = JSON.parse(fs.readFileSync("../data/playerData.json"));

// playerData.forEach((p) => {
//   const hm = players.find((x) => x._id === p._id);
//   if (!hm) console.log(p);
// });

const queue = new PQueue({ concurrency: 10, interval: 1000 / 25 });

const currentPlayers = `*[_type == 'player' && team->current == true]`;

client.fetch(currentPlayers).then((players) => {
  players.forEach((item, index) => {
    const fresh = playerData.find((x) => x._id === item._id);
    const rate = getRate(fresh.pp90);

    queue.add(() =>
      client
        .patch(item._id)
        .set({
          goals: fresh.goals,
          assists: fresh.assists,
          points: fresh.points,
          rate: fresh.points < 5 ? 3 : rate,
        })
        .commit()
        .then(() => console.log(index))
    );
  });
});

function getRate(pp90) {
  if (pp90 >= 0.9) return 1;
  if (0.9 > pp90 && pp90 >= 0.6) return 1.5;
  if (0.6 > pp90 && pp90 >= 0.4) return 2;
  if (0.4 > pp90) return 3;
}
