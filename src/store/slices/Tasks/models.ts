import { ITask } from "@/api/models/Response/Tasks/ITask";

export type TasksStoreType = {
  isLoading: boolean;
  todayTasks: ITask[];
  plannedTasks: ITask[];
  allTasks: ITask[]; 
}