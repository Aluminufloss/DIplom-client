import { notFound } from "next/navigation";

import ListTaskSection from "@/components/Tasks/Tasks/LIstTaskSection";
import getUserListsAndGroups from "@/utils/getUserLists";

export default async function ListPage({
  params,
}: {
  params: { slug: string };
}) {
  const userListsResponse = await getUserListsAndGroups();

  if (!userListsResponse) {
    notFound();
  }

  const userLists = userListsResponse.data.lists;

  const listById = userLists.find((list) => list.listId === params.slug);

  if (!listById) {
    notFound();
  }

  const userGroups = userListsResponse.data.groups;

  return (
    <ListTaskSection
      lists={userLists}
      groups={userGroups}
      listId={listById.listId}
      listName={listById.title}
    />
  );
}
