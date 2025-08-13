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
          main: "#4CAF50", // Leafy Green
          light: "#A5D6A7", // Soft Olive
          dark: "#388E3C", // Forest Green
          contrastText: "#F9F9F6", // Warm White
        },
        secondary: {
          main: "#A5D6A7", // Soft Olive
          light: "#C8E6C9",
          dark: "#81C784",
          contrastText: "#333333", // Charcoal
        },
        error: {
          main: "#E64A19", // Deep Orange
          light: "#FF8A65",
          dark: "#BF360C",
          contrastText: "#F9F9F6",
        },
        warning: {
          main: "#FBC02D", // Golden Yellow
          light: "#FDD835",
          dark: "#F57F17",
          contrastText: "#333333",
        },
        info: {
          main: "#A5D6A7", // Soft Olive
          light: "#C8E6C9",
          dark: "#81C784",
          contrastText: "#333333",
        },
        success: {
          main: "#388E3C", // Forest Green
          light: "#4CAF50",
          dark: "#2E7D32",
          contrastText: "#F9F9F6",
        },
        background: {
          default: "#F9F9F6", // Warm White
          paper: "#FFFFFF",
        },
        text: {
          primary: "#333333", // Charcoal
          secondary: "#7E7E7E", // Slate Grey
        },
        action: {
          active: "#6D4C41", // Earth Brown for CTA
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#4CAF50", // Leafy Green
          light: "#A5D6A7", // Soft Olive
          dark: "#388E3C", // Forest Green
          contrastText: "#F9F9F6", // Warm White
        },
        secondary: {
          main: "#A5D6A7", // Soft Olive
          light: "#C8E6C9",
          dark: "#81C784",
          contrastText: "#F9F9F6", // Warm White for dark mode
        },
        error: {
          main: "#E64A19", // Deep Orange
          light: "#FF8A65",
          dark: "#BF360C",
          contrastText: "#F9F9F6",
        },
        warning: {
          main: "#FBC02D", // Golden Yellow
          light: "#FDD835",
          dark: "#F57F17",
          contrastText: "#333333",
        },
        info: {
          main: "#A5D6A7", // Soft Olive
          light: "#C8E6C9",
          dark: "#81C784",
          contrastText: "#F9F9F6",
        },
        success: {
          main: "#388E3C", // Forest Green
          light: "#4CAF50",
          dark: "#2E7D32",
          contrastText: "#F9F9F6",
        },
        background: {
          default: "#1A1A1A", // Dark background
          paper: "#2D2D2D", // Dark paper
        },
        text: {
          primary: "#F9F9F6", // Warm White for dark mode
          secondary: "#B0B0B0", // Light grey for secondary text
        },
        action: {
          active: "#6D4C41", // Earth Brown for CTA
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