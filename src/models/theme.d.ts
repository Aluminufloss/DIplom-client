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
  primary: string;
  orangeSecondary: string;
  error: string;
  overlayColor: string;
}

interface FontWeight {
  semiBold: number;
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
      fnSemiBold: SimpleInterpolation,
      fnMedium: SimpleInterpolation,
      fnRegular: SimpleInterpolation,
      fnText: SimpleInterpolation,
      fnTitle1: SimpleInterpolation,
      fnTitle2: SimpleInterpolation,
      fnTitle3: SimpleInterpolation,
      fnTitle4: SimpleInterpolation,
      fnLabel0: SimpleInterpolation,
      fnLabel1: SimpleInterpolation,
      fnLabel2: SimpleInterpolation,
    },
    fontWeightValues: FontWeight,
    fontFamilyValues: FontFamily,
    zIndex: ZIndexes,
    colorValues: ThemeColors,
  }
}

export interface ThemeConfig {
  primaryColor?: string,
  primaryHover?: string,
  primaryTextColor?: string
}