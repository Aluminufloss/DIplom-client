import { PagesEnum } from "@/models";

export const getPageType = (pageUrl: string): PagesEnum => {
  const isTodayTasksPage = pageUrl.includes("today");
  const isAllTasksPage = pageUrl.includes("all");
  const isPlannedTasksPage = pageUrl.includes("planned");
  const isListPage = pageUrl.includes("list");

  if (isTodayTasksPage) {
    return PagesEnum.today;
  } else if (isAllTasksPage) {
    return PagesEnum.all;
  } else if (isPlannedTasksPage) {
    return PagesEnum.planned;
  } else if (isListPage) {
    return PagesEnum.list;
  } else {
    return PagesEnum.today;
  }
};
