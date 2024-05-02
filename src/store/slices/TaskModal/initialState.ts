import { getInitialSelectedDays } from "@/utils/getInitialSelectedDays";
import { TaskModalStoreType } from "./models";

export const taskModalInitState: TaskModalStoreType = {
  isModalVisible: false,
  modalParams: {
    modalType: "create",
    taskInfo: {
      title: "",
      description: "",
      repeatDays: getInitialSelectedDays(),
      plannedDate: new Date(),
      status: "active",
      priority: "low",
      listId: "",
      taskId: "",
      category: "",
    },
  },
};
