import "server-only";
import { TasksServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getTodayTasks = async (options?: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<TasksServerResponseType | undefined> => {
  "use server";

  const tasksResponse = await serverSideFetch<TasksServerResponseType>({
    url: "http://localhost:5000/getToday/task",
    method: "POST",
    body: options,
  });

  const taskData = await tasksResponse?.json();

  return taskData;
};

export default getTodayTasks;
