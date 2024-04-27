import "server-only";
import { TasksServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getAllTasks = async (): Promise<TasksServerResponseType | undefined> => {
  "use server"

  const tasksResponse = await serverSideFetch<TasksServerResponseType>({
    url: "http://localhost:5000/getAll/task",
    method: "POST",
  });
  
  return tasksResponse;
}

export default getAllTasks;