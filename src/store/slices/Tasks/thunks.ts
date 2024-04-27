"use client";

import TasksService from "@/api/services/TasksService";
import { TaskStatusType } from "@/models";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeTaskStatus = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (options: { taskId: string; status: TaskStatusType }) => {
    const response = await TasksService.changeTaskStatus(
      options.taskId,
      options.status
    );
    return response.data;
  }
);
