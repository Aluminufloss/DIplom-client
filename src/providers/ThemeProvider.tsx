"use client";

import { ThemeProvider } from "styled-components";
import { createTheme } from "../theme";

export default function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
