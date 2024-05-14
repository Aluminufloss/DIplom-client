import { notFound } from "next/navigation";

import getUserLists from "@/utils/getUserLists";

import ListTaskSection from "@/components/Tasks/Tasks/LIstTaskSection";
import { getUserGroups } from "@/utils/getUserGroups";

export default async function ListPage({
  params,
}: {
  params: { slug: string };
}) {
  const userListsResponse = await getUserLists();

  if (!userListsResponse) {
    notFound();
  }

  const userLists = userListsResponse.data;

  const listById = userLists.find((list) => list.listId === params.slug);

  if (!listById) {
    notFound();
  }

  const { groups, lists } = await getUserGroups(userLists);

  return (
    <ListTaskSection
      lists={lists}
      groups={groups}
      listId={listById.listId}
      listName={listById.title}
    />
  );
}
