import { TasksStoreType } from "./models";

export const TasksInitialState: TasksStoreType = {
  todayTasks: [],
  plannedTasks: [],
  allTasks: [],
  filteredTasks: [],
  isLoading: false,
}