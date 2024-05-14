"use client";

import { ITask } from "@/api/models/Response/Tasks/ITask";
import { isDatesEqual } from "@/utils/dateUtils";

export type GrouppedTasksOptionsType = {
  active: ITask[];
  completed: ITask[];
  expired: ITask[];
  planned: ITask[];
};

const getGrouppedTasks = (tasks?: ITask[]): GrouppedTasksOptionsType => {
  if (!tasks?.length || !tasks[0]) {
    return {
      active: [],
      completed: [],
      expired: [],
      planned: [],
    };
  }

  const grouppedTasks: GrouppedTasksOptionsType = {
    active: [],
    completed: [],
    expired: [],
    planned: [],
  };

  tasks.forEach((task) => {
    if (
      task.status === "active" &&
      !isDatesEqual(new Date(task.plannedDate), new Date())
    ) {
      grouppedTasks["planned"].push(task);
    } else {
      grouppedTasks[task.status].push(task);
    }
  });

  return grouppedTasks;
};

export default getGrouppedTasks;
