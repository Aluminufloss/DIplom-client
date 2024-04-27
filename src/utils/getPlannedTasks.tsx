import "server-only";
import { TasksServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getPlannedTasks = async (): Promise<TasksServerResponseType | undefined> => {
  "use server"

  const tasksResponse = await serverSideFetch<TasksServerResponseType>({
    url: "http://localhost:5000/getPlanned/task",
    method: "POST",
  });
  
  return tasksResponse;
}

export default getPlannedTasks;