import { getInitialSelectedDays } from "@/utils/getInitialSelectedDays";
import { TaskModalStoreType } from "./models";

export const taskModalInitState: TaskModalStoreType = {
	isModalVisible: false,
	modalParams: {
		modalType: "create",
		taskName: "",
		taskDescription: "",
		repeatDays: {
			days: getInitialSelectedDays(),
		},
		selectedList: {
			id: "",
			name: "",
		},
		selectedCategory: {
			id: "",
			name: "",
		},
		priority: "low",
	}
}