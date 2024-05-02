import $api from "@/axios";
import { TasksListType } from "@/models";
import { AxiosResponse } from "axios";

export default class ListsService {
  static async addList(title: string): Promise<AxiosResponse<TasksListType>> {
    return await $api.post("/create/list", { title });
  }

  static async deleteList(listId: string): Promise<AxiosResponse<string>> {
    return await $api.post("/delete/list", { listId });
  }

  static async getTasksByListId(listId: string): Promise<AxiosResponse<TasksListType>> {
    return await $api.post("/getTasksByListId/list", { listId });
  }

  static async getAllListsNames(listsId: string[]): Promise<AxiosResponse<string[]>> {
    return await $api.post("/getAll/listsName", { listsId });
  }
}