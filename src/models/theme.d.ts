// import original module declarations
import { css, SimpleInterpolation } from "styled-components";

interface ThemeColors {
  white: string;
  black: string;
  sidebarWhite: string;
  grey: string;
  darkGrey: string;
  lightGrey: string;
  strokeGrey: string;
  hoverGrey: string;
  green: string;
  redMain: string;
  redSecondary: string;
  blue: string;
  yellow: string;
  orangeMain: string;
  orangeSecondary: string;
  error: string;
  overlayColor: string;
}

interface FontWeight {
  medium: number;
  regular: number;
  text: number;
}

interface FontFamily {
  primary: string;
  secondary: string;
}

interface ZIndexes {
  [name: string]: number;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string,
    fontColor: string,
    bgColor: string,
    typography: {
      fnMedium: SimpleInterpolation,
      fnRegular: SimpleInterpolation,
      fnText: SimpleInterpolation,
    },
    fontWeightValues: FontWeight,
    fontFamilyValues: FontFamily,
    zIndex: ZIndexes,
    colorValues: ThemeColors,
  }
}

export interface ThemeConfig {
  schemeName?: string,
  primaryColor?: string,
  primaryHover?: string,
  primaryTextColor?: string
}