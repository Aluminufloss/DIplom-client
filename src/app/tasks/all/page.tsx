import AllTasksSection from "@/components/Tasks/Tasks/AllTasksSection";
import getAllTasks from "@/utils/getAllTasks";

export default async function AllTasksPage() {
  return (
    <AllTasksSection getTasks={getAllTasks}/>
  );
}
