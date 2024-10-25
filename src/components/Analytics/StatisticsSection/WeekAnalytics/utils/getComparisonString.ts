import {categoryEntityType } from "@/models";

export const getComparisonString = (
  thisWeek: number,
  lastWeek: number
): string => {
  if (thisWeek > lastWeek) {
    return `${thisWeek} (+${thisWeek - lastWeek})`;
  } else if (thisWeek < lastWeek) {
    return `${thisWeek} (-${lastWeek - thisWeek})`;
  }

  return `${thisWeek}`;
};

export const getTimeComparisonString = (
  thisWeek: categoryEntityType,
  lastWeek: categoryEntityType
): string => {
  const thisWeekDuration =
    thisWeek.totalTime.hours * 60 + thisWeek.totalTime.minutes;
  const lastWeekDuration =
    lastWeek.totalTime.hours * 60 + lastWeek.totalTime.minutes;

  if (thisWeekDuration > lastWeekDuration) {
    return `+${thisWeek.totalTime.hours - lastWeek.totalTime.hours} ч. ${thisWeek.totalTime.minutes - lastWeek.totalTime.minutes} мин.`;
  } else if (thisWeekDuration < lastWeekDuration) {
    return `-${lastWeek.totalTime.hours - thisWeek.totalTime.hours} ч. ${lastWeek.totalTime.minutes - thisWeek.totalTime.minutes} мин.`;
  }

  return `${thisWeek.totalTime.hours} ч. ${thisWeek.totalTime.minutes} мин.`;
};
