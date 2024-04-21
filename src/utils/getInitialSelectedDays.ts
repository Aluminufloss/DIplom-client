import { DaysOfWeek, SelectesdDayType } from "@/store/slices/TaskModal/models";

export const getInitialSelectedDays = (): SelectesdDayType[] => {
  return DaysOfWeek.map((_, index) => {
    return {
      day: DaysOfWeek[index],
      isSelected: false,
    }
  });
}