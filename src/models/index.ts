import { IUser } from "@/api/models/Response/Auth/IUser";
import { ITask } from "@/api/models/Response/Tasks/ITask";
import { AsyncThunk } from "@reduxjs/toolkit";

export type TaskStatusType = "active" | "completed" | "expired";
export type TaskPriorityType = "low" | "medium" | "high";

export type TasksListType = {
  listId: string;
  tasks: ITask[];
  title: string;
  groupId?: string;
};

export type GroupType = {
  id: string;
  name: string;
  lists: TasksListType[];
  userId?: string;
};

export type ListsAndGroupsType = {
  lists: TasksListType[];
  groups: GroupType[];
}

export type TasksAnalyticsType = {
  completed: number;
  active: number;
  expired: number;
  tasksLength: number;
};

export type priorityAnalyticsType = {
  low: number;
  medium: number;
  high: number;
};

export type categoriesAnalyticsType = {
  personal: number;
  work: number;
  study: number;
  other: number;
  travelling: number;
  without: number;
};

export type AnalyticsType = {
  tasksAnalytics: TasksAnalyticsType;
  priorityAnalytics: priorityAnalyticsType;
  categoriesAnalytics: categoriesAnalyticsType;
};

export type GraphSectionType = {
  id: number;
  value: number;
  label: string;
}

export type UserResponseType = {
  data: IUser;
  accessToken?: string;
  refreshToken?: string;
};

export type TasksServerResponseType = {
  data: ITask[];
  accessToken?: string;
};

export type ListsServerResponseType = {
  data: ListsAndGroupsType;
  accessToken?: string;
};

export type AnalyticsServerResponseType = {
  data: AnalyticsType;
  accessToken?: string;
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export type PageDataType = {
  tasks?: ITask[];
  lists?: TasksListType[];
  accessToken?: string;
  groups?: GroupType[];
};

export enum PagesEnum {
  "today" = "today",
  "all" = "all",
  "list" = "list",
  "analytics" = "analytics",
  "planned" = "planned",
}
