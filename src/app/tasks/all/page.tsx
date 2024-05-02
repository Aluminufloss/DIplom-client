import AllTasksSection from "@/components/Tasks/Tasks/AllTasksSection";
import getAllTasks from "@/utils/getAllTasks";
import getUserLists from "@/utils/getUserLists";

export default async function AllTasksPage() {
  return (
    <AllTasksSection getTasks={getAllTasks} getUserLists={getUserLists} />
  );
}
