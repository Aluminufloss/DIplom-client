import $api from "@/axios";
import { GroupType, TasksListType } from "@/models";
import { AxiosResponse } from "axios";

type UpdateGroupNameParamsType = {
  groupId: string;
  name: string;
};

type GroupListActionsParamsType = {
  groupId: string;
  listId?: string;
  listName?: string;
};

export class GroupService {
  static async deleteGroup(groupId: string): Promise<AxiosResponse<string>> {
    return await $api.post("/delete/group", { groupId });
  }

  static async addListToGroup(
    options: GroupListActionsParamsType
  ): Promise<AxiosResponse<TasksListType>> {
    const newList = await $api.post<TasksListType>("/create/list", { title: options.listName, groupId: options.groupId });
    await $api.post("/addList/group", { groupId: options.groupId, listId: newList.data.listId });
    return newList;
  }

  static async removeListFromGroup(
    options: GroupListActionsParamsType
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/removeList/group", { options });
  }

  static async updateGroupName(
    options: UpdateGroupNameParamsType
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/updateName/group", { options });
  }

  static async createGroup(name: string): Promise<AxiosResponse<GroupType>> {
    return await $api.post("/create/group", { name });
  }
}
