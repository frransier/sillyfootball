const { default: PQueue } = require("p-queue");
const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: "0jt5x7hu",
  dataset: "production",
  token:
    "sk3MLFuNbHgiuGHYut6QmNImvB8j9WuGDaSMucF2gTcwspX7jAb3qhrG1AGcuzfWpx97Cju1TcpGfE8Z070pU3DZqge1VnglwaSrLedmjCuWkAQBJ58OFpob9QRO40kZWdlngKCXKNbhXmMIxfyyNXtXc6iizxm6wiKNJ1jZ7DmjRxNIyhfy",
  useCdn: false,
});

const queue = new PQueue({ concurrency: 10, interval: 1000 / 25 });

const query = `*[_type == 'user']`;

client.fetch(query).then((users) => {
  users.forEach((user) => {
    queue.add(() =>
      client
        .patch(user._id)
        .set({
          trophies: 0,
        })
        .unset(["wins"])
        .commit()
        .then(() => console.log("Item updated"))
    );
  });
});
