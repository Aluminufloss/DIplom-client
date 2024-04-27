import getTodayTasks from "@/utils/getTodayTasks";
import TodayTasksSection from "@/components/Tasks/Tasks/TodayTasksSection";

export default async function TodayTasksPage() {
  return (
    <TodayTasksSection getTasks={getTodayTasks}/>
  );
}
