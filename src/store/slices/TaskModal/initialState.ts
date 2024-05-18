import { getInitialSelectedDays } from "@/utils/getInitialSelectedDays";
import { TaskModalStoreType } from "./models";
import getInitialListId from "@/utils/getInitialListId";

export const taskModalInitState: TaskModalStoreType = {
  isModalVisible: false,
  modalParams: {
    modalType: "create",
    taskInfo: {
      title: "",
      description: "",
      repeatDays: getInitialSelectedDays(),
      plannedDate: new Date().toISOString(),
      status: "active",
      priority: "low",
      listId: getInitialListId(),
      taskId: "",
      category: "Without",
    },
  },
};
