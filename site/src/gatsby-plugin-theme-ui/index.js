export default {
  space: [0, 1, 2, 4, 8, 16, 32],
  colors: {
    text: "black",
    background: "white",
    primary: "#66fcf1",
    secondary: "#1f2833",
    muted: "lightgrey",
    red: "#FC427B"
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif'
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
      fontSize: [4, 5]
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
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "muted"
    },
    img: {
      maxWidth: "100%"
    }
  }
}
