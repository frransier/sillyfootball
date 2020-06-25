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
const users = JSON.parse(fs.readFileSync("../data/users.json"));
const currentTickets = JSON.parse(
  fs.readFileSync("../data/currentTickets.json")
);
const scores = currentTickets.map((x) => x.score);
const highscore = Math.max(...scores);
const trophyCount = Math.round(
  currentTickets.length / scores.filter((x) => x === highscore).length
);

const queue = new PQueue({ concurrency: 10, interval: 1000 / 25 });

users.forEach((item, index) => {
  const hasPlayed = currentTickets.find((x) => x.user._id === item._id);

  if (hasPlayed) {
    //TODO sum up last 3 tickets
    const average = hasPlayed.score / 3;
    const high = hasPlayed.score > item.high ? hasPlayed.score : item.high;
    const trophies =
      hasPlayed.score === highscore ? trophyCount : item.trophies;

    queue.add(() =>
      client
        .patch(item._id)
        .set({
          average: Number(average.toFixed(2)),
          high: high,
          trophies: trophies,
        })
        .commit()
        .then(() => console.log(index))
    );
  }
});
