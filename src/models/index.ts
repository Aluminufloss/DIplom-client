import { IUser } from "@/api/models/Response/Auth/IUser";
import { ITask } from "@/api/models/Response/Tasks/ITask";
import { AsyncThunk } from "@reduxjs/toolkit";

export type TaskStatusType = "active" | "completed" | "expired";
export type TaskPriorityType = "low" | "medium" | "high";

export type TasksListType = { 
	listId: string;
	tasks: ITask[],
	title: string,
	groupId?: string;
}

export type GroupType = {
	id: string;
	name: string;
	lists: TasksListType[],
	userId?: string;
}

export type UserResponseType = {
  data: IUser;
  accessToken?: string;
	refreshToken?: string;
}

export type TasksServerResponseType = {
  data: ITask[];
  accessToken?: string;
}

export type ListsServerResponseType = {
	data: TasksListType[];
	accessToken?: string;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export type PageDataType = {
	tasks?: ITask[],
	lists?: TasksListType[],
	accessToken?: string;
	groups?: GroupType[],
}