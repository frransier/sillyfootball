import { GiPapers } from "react-icons/gi";

export default {
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },

    {
      name: "intro",
      title: "Intro",
      type: "string",
      validation: Rule => Rule.max(120)
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },
    {
      name: "image",
      title: "Main Image",
      type: "image"
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }]
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: GiPapers,
        subtitle: "Page"
      };
    }
  }
};
