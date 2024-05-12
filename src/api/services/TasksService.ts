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
    taskData: ITask
  ): Promise<AxiosResponse<ITask>> {
    return await $api.post<ITask>("/update/task", { taskData });
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
  ): Promise<AxiosResponse<ITask>> {
    return await $api.post<ITask>("/create/task", { taskData });
  }

  public static async changeTaskStatus(
    taskId: string,
    status: TaskStatusType
  ): Promise<AxiosResponse<ITask>> {
    return await $api.post<ITask>(`/changeStatus/task`, {
      taskId,
      status,
    });
  }
}
