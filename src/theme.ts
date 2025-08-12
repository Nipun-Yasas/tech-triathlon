import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {}
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#4CAF50",
          light: "#4CAF50",
          dark: "#4CAF50",
          contrastText: "#fff",
        },
        secondary: {
          main: "#FBC02D",
          light: "#FBC02D",
          dark: "#FBC02D",
          contrastText: "#fff",
        },
        error: {
          main: "#F44336",
          light: "#ef5350",
          dark: "#c62828",
          contrastText: "#fff",
        },
        warning: {
          main: "#FF7A00",
          light: "#FF9F40",
          dark: "#CC5500",
          contrastText: "#fff",
        },
        info: {
          main: "#007BFF",
          light: "#4DA3FF",
          dark: "#0056CC",
          contrastText: "#fff",
        },
        success: {
          main: "#308242",
          light: "#1A4424",
          dark: "#1A4424",
          contrastText: "#fff",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#4D4D4D",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#4CAF50",
          light: "#4CAF50",
          dark: "#4CAF50",
          contrastText: "#fff",
        },
        secondary: {
          main: "#FBC02D",
          light: "#FBC02D",
          dark: "#FBC02D",
          contrastText: "#fff",
        },
        error: {
          main: "#F44336",
          light: "#ef5350",
          dark: "#c62828",
          contrastText: "#fff",
        },
        warning: {
          main: "#FF7A00",
          light: "#FF9F40",
          dark: "#CC5500",
          contrastText: "#fff",
        },
        info: {
          main: "#007BFF",
          light: "#4DA3FF",
          dark: "#0056CC",
          contrastText: "#fff",
        },
        success: {
          main: "#308242",
          light: "#1A4424",
          dark: "#1A4424",
          contrastText: "#fff",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
        },
      },
    },
  },
  typography: {
    fontFamily:
      'Inter, Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: "Inter, sans-serif",
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Inter, sans-serif",
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      textTransform: "none",
    },
  },
});

export default theme;