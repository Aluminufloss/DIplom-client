import { TasksStoreType } from "./models";

export const TasksInitialState: TasksStoreType = {
  todayTasks: [],
  plannedTasks: [],
  allTasks: [],
  isLoading: false,
  searchValue: "",
}