import $api from "@/axios";
import { AxiosResponse } from "axios";

export class GroupService {
  static async deleteGroup(groupId: string): Promise<AxiosResponse<string>> {
    return await $api.post("/delete/group", { groupId });
  }

  static async addListToGroup(
    groupId: string,
    listId: string
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/addList/group", { groupId, listId });
  }

  static async removeListFromGroup(
    groupId: string,
    listId: string
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/removeList/group", { groupId, listId });
  }

  static async updateGroupName(
    groupId: string,
    name: string
  ): Promise<AxiosResponse<string>> {
    return await $api.post("/updateName/group", { groupId, name });
  }

  static async createGroup(name: string): Promise<AxiosResponse<string>> {
    return await $api.post("/create/group", { name });
  }
}
