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
	taskName: string;
	taskDescription: string;
	priority: PriorityType;
	plannedDate?: Date;
	repeatDays: RepeatDaysType;
	selectedList?: SelectedListType;
	selectedCategory?: SelectedCategoryType;
}