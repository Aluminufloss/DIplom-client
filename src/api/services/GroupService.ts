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
    return await $api.delete(`/group/${groupId}`);
  }

  static async addListToGroup(
    options: GroupListActionsParamsType
  ): Promise<AxiosResponse<TasksListType>> {
    const newList = await $api.post<TasksListType>("/list", { title: options.listName, groupId: options.groupId });
    await $api.patch(`/group/${options.groupId}/list`, {
      listId: newList.data.listId,
    });
    return newList;
  }

  static async removeListFromGroup(
    options: GroupListActionsParamsType
  ): Promise<AxiosResponse<string>> {
    return await $api.delete(`/group/${options.groupId}/list`, {
      data: { listId: options.listId },
    });
  }

  static async updateGroupName(
    options: UpdateGroupNameParamsType
  ): Promise<AxiosResponse<string>> {
    return await $api.patch(`/group/${options.groupId}/name`, {
      name: options.name,
    });
  }

  static async createGroup(name: string): Promise<AxiosResponse<GroupType>> {
    return await $api.post("/group", { name });
  }
}
