import { FaTag } from "react-icons/fa";

export default {
  name: "tag",
  title: "Tags",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: x => true
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
        media: FaTag,
        subtitle: "Tag"
      };
    }
  }
};
