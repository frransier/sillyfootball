export default {
  colors: {
    text: "#060606",
    background: "#fff",
    primary: "#3cf",
    secondary: "#e0f",
    muted: "#191919",
    highlight: "#29112c",
    gray: "#999",
    purple: "#c0f"
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace"
  },
  fontSizes: [9, 10, 12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      letterSpacing: 1.5
    },
    body: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      letterSpacing: 0.5
    },
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "display",
      letterSpacing: 1.5,
      mt: 3
    },
    text: {
      variant: "textStyles.body",
      fontSize: 1,
      fontWeight: "body"
    }
  },
  styles: {
    Container: {
      p: 3,
      maxWidth: 1024
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      overflowY: "scroll"
    },
    h1: {
      variant: "textStyles.display",
      fontSize: [5, 6]
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1
    },
    a: {
      color: "primary",
      "&:hover": {
        color: "secondary"
      }
    },
    p: {
      variant: "textStyles.text",
      m: 0
    },
    code: {
      fontFamily: "monospace",
      color: "secondary",
      fontSize: 1
    },
    inlineCode: {
      fontFamily: "monospace",
      color: "secondary",
      bg: "muted"
    },
    table: {
      width: "100%",
      my: 4,
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid"
      }
    },
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px"
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px"
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "muted"
    },
    img: {
      maxWidth: "100%"
    }
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "gray"
    },
    ".comment": {
      fontStyle: "italic"
    },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable": {
      color: "purple"
    },
    ".atrule,.attr-value,.keyword": {
      color: "primary"
    },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "secondary"
    }
  }
}
