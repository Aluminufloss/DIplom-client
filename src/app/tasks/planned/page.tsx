import PlannedTasksSection from "@/components/Tasks/Tasks/PlannedTasksSection";
import getPlannedTasks from "@/utils/getPlannedTasks";

export default async function PlannedTasksPage() {
  return (
    <PlannedTasksSection getTasks={getPlannedTasks}/>
  );
}
