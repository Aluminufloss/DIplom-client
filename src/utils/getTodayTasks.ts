import "server-only";
import { TasksServerResponseType } from "@/models";

import { serverSideFetch } from "./serverSideFetch";

const getTodayTasks = async (): Promise<TasksServerResponseType | undefined> => {
  "use server"

  const tasksResponse = await serverSideFetch<TasksServerResponseType>({
    url: "http://localhost:5000/getToday/task",
    method: "POST",
  });
  
  return tasksResponse;
}

export default getTodayTasks;