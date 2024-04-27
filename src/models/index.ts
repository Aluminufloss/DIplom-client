import { IUser } from "@/api/models/Response/Auth/IUser";
import { ITask } from "@/api/models/Response/Tasks/ITask";

export type TaskStatusType = "active" | "completed" | "expired";
export type TaskPriorityType = "low" | "medium" | "high";

export type TasksListType = { 
	id: string;
	tasks: ITask[],
	groupId: string;
}

export type GroupType = {
	id: string;
	lists: TasksListType[],
	userId: string;
}

export type UserResponseType = {
  data: IUser;
  accessToken?: string;
}

export type TasksServerResponseType = {
  data: ITask[];
  accessToken?: string;
}