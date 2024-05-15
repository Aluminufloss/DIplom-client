import { GraphSectionType, TasksAnalyticsType } from "@/models";

export const makeGraphSections = (
  data: TasksAnalyticsType
): GraphSectionType[] => {
  const activeSection: GraphSectionType = {
    id: 0,
    label: "Активные",
    value: data.active,
  };

  const completedSection: GraphSectionType = {
    id: 1,
    label: "Завершённые",
    value: data.completed,
  };

  const expiredSection: GraphSectionType = {
    id: 2,
    label: "Просроченные",
    value: data.expired,
  };

  return [activeSection, completedSection, expiredSection];
};
