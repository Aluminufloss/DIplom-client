import getTodayTasks from "@/utils/getTodayTasks";
import TodayTasksSection from "@/components/Tasks/Tasks/TodayTasksSection";
import getUserLists from "@/utils/getUserLists";

export default async function TodayTasksPage() {
  return (
    <TodayTasksSection getTasks={getTodayTasks} getUserLists={getUserLists}/>
  );
}
