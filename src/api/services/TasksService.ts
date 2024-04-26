import { AxiosResponse } from "axios";
import $api from "@/axios";

import { TasksResponse } from "../models/Response/Tasks";
import { ITask } from "../models/Response/Tasks/ITask";

export default class TasksService {
  public static async getTodayTasks(
    userId: string
  ): Promise<AxiosResponse<TasksResponse>> {
    return await $api.post<TasksResponse>(`/tasks/today`, {
      userId,
    });
  }

  public static async getTask(
    taskId: string
  ): Promise<AxiosResponse<TasksResponse>> {
    return await $api.post<TasksResponse>(`/get/task`, {
      taskId,
    });
  }

  public static async updateTask(
    updatedTaskData: ITask
  ): Promise<AxiosResponse<TasksResponse>> {
    return await $api.patch<TasksResponse>("/update/task", { updatedTaskData });
  }

  public static async deleteTask(
    taskId: string
  ): Promise<void> {
    await $api.post<TasksResponse>(`/delete/task`, {
      taskId,
    });
  }

  public static async createTask(
    taskData: ITask
  ): Promise<AxiosResponse<TasksResponse>> {
    return await $api.post<TasksResponse>("/create/task", { taskData });
  }
}
