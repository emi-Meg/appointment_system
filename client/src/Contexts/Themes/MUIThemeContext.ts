import { createTheme } from "@mui/material";

export const muiThemeContext = createTheme({
    breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
    typography: {
        fontFamily: "'Quicksand', sans-serif",
        button: {
            fontWeight: "bold"
        },
    }
});