export default {
  name: "logo",
  type: "image",
  title: "Club logo",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      validation: Rule => Rule.error("Required").required(),
      options: { isHighlighted: true }
    }
  ],
  preview: {
    select: { imageUrl: "asset.url", title: "logo" }
  }
};
