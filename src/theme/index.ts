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
    fnSemiBold: css`
      font-family: ${fontFamily.primary};
      font-weight: ${fontWeight.semiBold};
      font-style: normal;
    `,
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
    fnTitle1: css`
      font-size: 16px;
      line-height: 24px;
    `,
    fnTitle2: css`
      font-size: 20px;
      line-height: 28px;
    `,
    fnTitle3: css`
      font-size: 24px;
      line-height: 32px;
    `,
    fnTitle4: css`
      font-size: 28px;
      line-height: 32px;
    `,
    fnLabel0: css`
      font-size: 10px;
      line-height: 14px;
    `,
    fnLabel1: css`
      font-size: 12px;
      line-height: 16px;
    `,
    fnLabel2: css`
      font-size: 14px;
      line-height: 18px;
    `,
  },
  zIndex,
  fontWeightValues: fontWeight,
  fontFamilyValues: fontFamily,
  colorValues: colors,
};

export const createTheme = (configParams?: {
  primaryColor?: string;
}): DefaultTheme => ({
  ...themeDefault,
  colorValues: {
    ...themeDefault.colorValues,
    primary: configParams?.primaryColor ?? themeDefault.colorValues.primary,
  },
});
