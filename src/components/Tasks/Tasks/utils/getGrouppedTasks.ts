"use client";

import { ITask } from "@/api/models/Response/Tasks/ITask";

export type GrouppedTasksOptionsType = {
  active: ITask[];
  completed: ITask[];
  expired: ITask[];
}

const getGrouppedTasks = (tasks?: ITask[]): GrouppedTasksOptionsType => {
  if (!tasks?.length || !tasks[0]) {
    return {
      active: [],
      completed: [],
      expired: [],
    }
  }

  const grouppedTasks: GrouppedTasksOptionsType = {
    active: [],
    completed: [],
    expired: [],
  };

  tasks.forEach((task) => {
    grouppedTasks[task.status].push(task);
  });

  return grouppedTasks;
}

export default getGrouppedTasks;
