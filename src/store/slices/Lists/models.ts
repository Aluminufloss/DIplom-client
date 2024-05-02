import { TasksListType } from "@/models";

export type ListsStoreType = {
  isLoading: boolean,
  lists: TasksListType[],
}

export interface ErrorPayload {
  message: string;
}

export type ServerErrorMessage = {
  message: string;
}