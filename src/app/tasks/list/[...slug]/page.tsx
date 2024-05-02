import ListTaskSection from "@/components/Tasks/Tasks/LIstTaskSection";
import getUserLists from "@/utils/getUserLists";

export default async function ListPage() {
  return (
    <ListTaskSection getUserLists={getUserLists} />
  );
}
