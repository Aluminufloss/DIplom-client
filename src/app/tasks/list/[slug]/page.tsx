import { notFound } from "next/navigation";

import getUserListsAndGroups from "@/utils/getUserLists";

import ListTaskSection from "@/components/Tasks/Tasks/LIstTaskSection";

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
  const userGroups = userListsResponse.data.groups;

  const listByIdFromLists = userLists.find((list) => list.listId === params.slug);
  const findedGroup = userGroups.find(
    (group) => {
      const findedList = group.lists.find((list) => {
        if (list.listId === params.slug) {
          return list;
        }
      });

      if (findedList) {
        return findedList;
      }
    }
  );

  const listByIdFromGroups = findedGroup?.lists.find((list) => list.listId === params.slug);

  if (!listByIdFromLists && !listByIdFromGroups) {
    notFound();
  }

  const accessToken = userListsResponse.accessToken;;

  return (
    <ListTaskSection
      accessToken={accessToken}
      lists={userLists}
      groups={userGroups}
      listId={listByIdFromLists?.listId || listByIdFromGroups?.listId}
      listName={listByIdFromLists?.title || listByIdFromGroups?.title}
    />
  );
}
