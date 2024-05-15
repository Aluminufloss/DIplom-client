export const getAnalyticsPercent = (value?: number, maxValue?: number): number => {
  if (!value || !maxValue) {
    return 0;
  }

  return Math.round((value / maxValue) * 100);
}