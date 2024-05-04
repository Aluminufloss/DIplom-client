import { GroupType, TasksListType } from "@/models";
import { serverSideFetch } from "./serverSideFetch";
import { API_URL } from "./constant";

type Group = { [key: string]: TasksListType[] };

type ReturnType = {
  groups: GroupType[];
  lists: TasksListType[];
};

export const getUserGroups = async (
  lists: TasksListType[]
): Promise<ReturnType> => {
  const groups: Group = {};
  const resultGroups: GroupType[] = [];
  const listsWithoutGroups:TasksListType[] = [];

  lists.forEach((list) => {
    if (!list.groupId) {
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

  return { groups: resultGroups, lists: listsWithoutGroups };
};
