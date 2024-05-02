import $api from "@/axios";
import { AxiosResponse } from "axios";

type UpdateGroupNameParamsType = {
  groupId: string;
  name: string;
};

type GroupListActionsParamsType = {
  groupId: string;
  listId: string;
};

export class GroupService {
  static async deleteGroup(groupId: string): Promise<AxiosResponse<string>> {
    return await $api.post("/delete/group", { groupId });
  }

  static async addListToGroup(
    options: GroupListActionsParamsType
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/addList/group", { options });
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

  static async createGroup(name: string): Promise<AxiosResponse<string>> {
    return await $api.post("/create/group", { name });
  }
}
