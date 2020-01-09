import { MdFormatIndentDecrease } from "react-icons/md";

export default {
  title: "Rich text",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: Rule =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["https", "http", "mailto", "tel"]
                  })
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean"
              }
            ]
          }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: "description"
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: MdFormatIndentDecrease,
        subtitle: "Text module"
      };
    }
  }
};
