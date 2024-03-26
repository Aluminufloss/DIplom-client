import { css, DefaultTheme } from "styled-components";

import { colors, fontFamily, fontWeight, zIndex } from "./constants";

/*
 * Default Theme
 */
export const themeDefault: DefaultTheme = {
  fontFamily: fontFamily.primary,
  fontColor: colors.black,
  bgColor: colors.white,
  typography: {
    fnMedium: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.medium};
      font-style: normal;
    `,
    fnRegular: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.regular};
      font-style: normal;
    `,
    fnText: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.text};
    `,
  },
	zIndex,
  fontWeightValues: fontWeight,
  fontFamilyValues: fontFamily,
  colorValues: colors,
};

