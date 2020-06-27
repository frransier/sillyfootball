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

const queue = new PQueue({ concurrency: 10, interval: 1000 / 25 });

const query = `*[_type == 'team' && next == true]`;

client.fetch(query).then((items) => {
  console.log(items);

  // fs.writeFileSync("../data/players.json", JSON.stringify(items));
  // items.forEach((item) => {
  //   queue.add(() =>
  //     client
  //       .patch(item._id)
  //       // .delete(item._id)
  //       .setIfMissing({ friends: [] })
  //       // .set({
  //       //   current: false,
  //       //   next: false,
  //       // })
  //       // .unset(["wins"])
  //       .commit()
  //       .then(() => console.log("Item updated"))
  //   );
  // });
});
