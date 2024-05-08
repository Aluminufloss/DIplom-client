import getPlannedPageData from "@/utils/getPlannedPageData";

import PlannedTasksSection from "@/components/Tasks/Tasks/PlannedTasksSection";

export default async function PlannedTasksPage() {
  const plannedPageData = await getPlannedPageData();

  return (
    <PlannedTasksSection
      tasks={plannedPageData?.tasks}
      lists={plannedPageData?.lists}
      accessToken={plannedPageData?.accessToken}
    />
  );
}
