import { TasksListType } from "@/models";

export interface GroupResponseType {
  name: string;
  lists: TasksListType[];
}