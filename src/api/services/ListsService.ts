import $api from "@/axios";
import { TasksListType } from "@/models";
import { AxiosResponse } from "axios";

export default class ListsService {
  static async addList(title: string, groupId?: string): Promise<AxiosResponse<TasksListType>> {
    return await $api.post("/list", { title, groupId });
  }

  static async deleteList(listId: string): Promise<AxiosResponse<string>> {
    return await $api.delete(`/list/${listId}`);
  }

  static async getTasksByListId(listId: string): Promise<AxiosResponse<TasksListType>> {
    return await $api.get(`/list/${listId}/tasks`);
  }

  static async getAllListsNames(listsIds: string[]): Promise<AxiosResponse<string[]>> {
    return await $api.post("/listsNames", { listsIds });
  }
}
