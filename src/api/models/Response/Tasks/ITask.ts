import { TaskPriorityType, TaskStatusType } from "@/models";

export interface ITask {
  taskId: string;
  listId: string;
  title: string;
  status: TaskStatusType;
  priority: TaskPriorityType;
  plannedDate: Date;
  repeatDays: number[];
  description?: string;
  category?: string;
}