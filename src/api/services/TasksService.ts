import { AxiosResponse } from "axios";
import $api from "@/axios";

import { TaskStatusType } from "@/models";
import { TasksResponseType } from "../models/Response/Tasks";
import { ITask } from "../models/Response/Tasks/ITask";

export default class TasksService {
  public static async getTodayTasks(
    userId: string
  ): Promise<AxiosResponse<TasksResponseType>> {
    return await $api.get<TasksResponseType>(`/tasks/today`, {
      params: { userId },
    });
  }

  public static async getTask(taskId: string): Promise<AxiosResponse<ITask>> {
    return await $api.get<ITask>(`/task/${taskId}`);
  }

  public static async updateTask(
    taskData: Partial<ITask>
  ): Promise<AxiosResponse<ITask>> {
    console.log('taskData', taskData)
    console.log('id', taskData.taskId)
    return await $api.put<ITask>(`/task/${taskData.taskId}`, taskData);
  }

  public static async deleteTask(taskId: string): Promise<void> {
    await $api.delete(`/task/${taskId}`);
  }

  public static async createTask(
    taskData: ITask
  ): Promise<AxiosResponse<ITask>> {
    return await $api.post<ITask>("/task", taskData);
  }

  public static async changeTaskStatus(
    taskId: string,
    status: TaskStatusType
  ): Promise<AxiosResponse<ITask>> {
    return await $api.patch<ITask>(`/task/${taskId}/status`, { status });
  }
}
