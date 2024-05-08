import getAllTasksPageData from "@/utils/getAllTasksPageData";

import AllTasksSection from "@/components/Tasks/Tasks/AllTasksSection";

export default async function AllTasksPage() {
  const allTasksPageData = await getAllTasksPageData();

  return (
    <AllTasksSection
      tasks={allTasksPageData?.tasks}
      lists={allTasksPageData?.lists}
      accessToken={allTasksPageData?.accessToken}
    />
  );
}
