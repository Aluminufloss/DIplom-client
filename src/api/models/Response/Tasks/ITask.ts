import { TaskPriorityType, TaskStatusType } from "@/models";
import { SelectesdDayType } from "@/store/slices/TaskModal/models";

export interface ITask {
  taskId: string;
  listId?: string;
  title: string;
  status: TaskStatusType;
  priority: TaskPriorityType;
  plannedDate: string;
  repeatDays: SelectesdDayType[];
  description?: string;
  category?: string;
}