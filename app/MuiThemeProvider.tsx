"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 20,
      fontWeight: "bold",
    },
  },
});

export default function MyThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
