import { TasksListType } from "@/models";

export type ListsStoreType = {
  isLoading: boolean,
  lists: TasksListType[],
}