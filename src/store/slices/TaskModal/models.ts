import { ITask } from "@/api/models/Response/Tasks/ITask";

export type TaskModalStoreType = {
	isModalVisible: boolean;
	modalParams: ModalParamsType;
}

export type ModalType = "create" | "edit";

export type PriorityType = "low" | "medium" | "high";

export type RepeatDaysType = {
	days: SelectesdDayType[];
}

export type SelectesdDayType = {
	day: string;
	isSelected: boolean;
}

export const DaysOfWeek: string[] = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];

export const TranslatedDays = {
	Mon: "Пн",
	Tue: "Вт",
	Wed: "Ср",
	Thu: "Чт",
	Fri: "Пт",
	Sat: "Сб",
	Sun: "Вс",
}

export type SelectedListType = {
	id: string;
	name: string;
}

export type SelectedCategoryType = {
	id: string;
	name: string;
}

export type ModalParamsType = {
	modalType: ModalType;
  taskInfo: ITask;
}