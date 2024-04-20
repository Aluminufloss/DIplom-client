import { IUser } from "@/api/models/Response/Auth/IUser";

export type TaskType = {
	id: string;
	title: string;
	description: string;
	plannedDate: string;
	category: string;
	repeat: number[];
	status: TaskStatusType;
}

export type TaskStatusType = "completed" | "incomplited";

export type TasksListType = { 
	id: string;
	tasks: TaskType[],
	groupId: string;
}

export type GroupType = {
	id: string;
	lists: TasksListType[],
	userId: string;
}

export type UserResponseType = {
  data: IUser;
  accessToken: string;
}