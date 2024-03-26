import { FontFamily, FontWeight, ThemeColors, ZIndexes } from "@/models/theme";

export const fontFamily: FontFamily = {
  primary: `var(--font-poppins)`,
  secondary: `var(--font-poppins)`,
};

export const fontWeight: FontWeight = {
  medium: 500,
  regular: 400,
  text: 450,
};

export const colors: ThemeColors = {
  white: "#FFFFFF",
  sidebarWhite: "#FAFAFA",
  black: "rgba(0, 0, 0, 0.86)",
  grey: "#C1C1C1",
  darkGrey: "#A0A0A0",
  lightGrey: "#DFDFDF",
  strokeGrey: "#",
  hoverGrey: "#",
  orangeMain: "#FABB18",
  orangeSecondary: "#EFAE04",
  yellow: "#FFF44F",
  redMain: "#F85640",
  redSecondary: "#FF2400",
  error: "#F30000",
  green: "#46BD84",
  blue: "#08A0F7",
  overlayColor: "rgba(50, 50, 50, 0.7)",
};

export const zIndex: ZIndexes = {
  taskModal: 10000,
};
