import getTodayPageData from "@/utils/getTodayPageData";

import TodayTasksSection from "@/components/Tasks/Tasks/TodayTasksSection";

export default async function TodayTasksPage() {
  const todayPageData = await getTodayPageData();

  return (
    <TodayTasksSection
      tasks={todayPageData?.tasks}
      lists={todayPageData?.lists}
      accessToken={todayPageData?.accessToken}
    />
  );
}
