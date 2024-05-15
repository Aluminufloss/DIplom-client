import "server-only";
import { TasksServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getPlannedTasks = async (options?: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<TasksServerResponseType | undefined> => {
  "use server"

  const tasksResponse = await serverSideFetch<TasksServerResponseType>({
    url: "http://localhost:5000/getPlanned/task",
    method: "POST",
    body: options,
  });

  const tasksData = await tasksResponse?.json();
  
  return tasksData;
}

export default getPlannedTasks;