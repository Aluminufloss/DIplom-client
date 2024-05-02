import PlannedTasksSection from "@/components/Tasks/Tasks/PlannedTasksSection";
import getPlannedTasks from "@/utils/getPlannedTasks";
import getUserLists from "@/utils/getUserLists";

export default async function PlannedTasksPage() {
  return (
    <PlannedTasksSection getTasks={getPlannedTasks} getUserLists={getUserLists}/>
  );
}
