const { default: PQueue } = require("p-queue");
const sanityClient = require("@sanity/client");
const fs = require("fs");
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token:
    "sk3MLFuNbHgiuGHYut6QmNImvB8j9WuGDaSMucF2gTcwspX7jAb3qhrG1AGcuzfWpx97Cju1TcpGfE8Z070pU3DZqge1VnglwaSrLedmjCuWkAQBJ58OFpob9QRO40kZWdlngKCXKNbhXmMIxfyyNXtXc6iizxm6wiKNJ1jZ7DmjRxNIyhfy",
  useCdn: false,
});

const queue = new PQueue({ concurrency: 10, interval: 1000 / 25 });

const query = `*[_type == 'player']`;

client.fetch(query).then((items) => {
  fs.writeFileSync("../data/players.json", JSON.stringify(items));
  // items.forEach((item) => {
  //   queue.add(() =>
  //     client
  //       // .patch(item._id)
  //       .delete(item._id)
  //       // .set({
  //       //   current: false,
  //       //   next: false,
  //       // })
  //       // .unset(["wins"])
  //       // .commit()
  //       .then(() => console.log("Item updated"))
  //   );
  // });
});
