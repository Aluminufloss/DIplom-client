"use server";

import { GroupType, TasksListType } from "@/models";
import { serverSideFetch } from "./serverSideFetch";
import { API_URL } from "./constant";

type Group = { [key: string]: TasksListType[] };

type ReturnType = {
  groups: GroupType[];
  lists: TasksListType[];
};

export const getUserGroups = async (
  lists?: TasksListType[]
): Promise<ReturnType> => {
  "use server";

  const groups: Group = {};
  const resultGroups: GroupType[] = [];
  let listsWithoutGroups: TasksListType[] = [];

  const groupsFromServer = await serverSideFetch<{ data: GroupType[] }>({
    url: `${API_URL}/getGroups/group`,
    method: "POST",
  });

  const groupFromServerData = await groupsFromServer?.json() as { data: GroupType[] };

  const groupsWithoutLists = groupFromServerData?.data.filter(
    (group) => group.lists.length === 0
  );

  if (!!lists?.length) {
    lists.forEach((list) => {
      if (!list.groupId) {
        if (!listsWithoutGroups) {
          listsWithoutGroups = [];
        }
        listsWithoutGroups.push(list);
        return;
      }

      if (!groups[list.groupId]) {
        groups[list.groupId] = [list];
      } else {
        groups[list.groupId].push(list);
      }
    });

    for (const groupId of Object.keys(groups)) {
      const groupName = await serverSideFetch<string>({
        url: `${API_URL}/getGroupName/group`,
        method: "POST",
        body: { groupId },
      });

      const newGroup: GroupType = {
        id: groupId,
        name: groupName ?? "Группа",
        lists: groups[groupId],
      };

      resultGroups.push(newGroup);
    }
  }

  if (!!groupsWithoutLists?.length) {
    resultGroups.push(...groupsWithoutLists);
  }

  return { groups: resultGroups, lists: listsWithoutGroups };
};
