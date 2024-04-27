import { AxiosResponse } from "axios";
import $api from "@/axios";

import { TaskStatusType } from "@/models";
import { TasksResponseType } from "../models/Response/Tasks";
import { ITask } from "../models/Response/Tasks/ITask";

export default class TasksService {
  public static async getTodayTasks(
    userId: string
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.post<TasksResponseType>(`/tasks/today`, {
      userId,
    });
  }

  public static async getTask(
    taskId: string
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.post<TasksResponseType>(`/get/task`, {
      taskId,
    });
  }

  public static async updateTask(
    updatedTaskData: ITask
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.patch<TasksResponseType>("/update/task", { updatedTaskData });
  }

  public static async deleteTask(
    taskId: string
  ): Promise<void> {
    await $api.post<TasksResponseType>(`/delete/task`, {
      taskId,
    });
  }

  public static async createTask(
    taskData: ITask
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.post<TasksResponseType>("/create/task", { taskData });
  }

  public static async changeTaskStatus(
    taskId: string,
    status: TaskStatusType
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.post<TasksResponseType>(`/changeStatus/task`, {
      taskId,
      status,
    });
  }
}
