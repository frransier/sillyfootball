import Video from "../../../site/src/components/video";

export default {
  title: "Video",
  name: "video",
  type: "object",
  fields: [
    {
      title: "URL",
      name: "url",
      type: "url"
    }
  ],
  preview: {
    select: {
      url: "url"
    },
    component: Video
  }
};
