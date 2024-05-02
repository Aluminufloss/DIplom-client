"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { TaskStatusType } from "@/models";

import { ITask } from "@/api/models/Response/Tasks/ITask";
import TasksService from "@/api/services/TasksService";

interface ErrorPayload {
  message: string;
}

export const changeTaskStatus = createAsyncThunk(
  "tasks/changeTaskStatus",
  async (options: { taskId: string; status: TaskStatusType }, { rejectWithValue }) => {
    try {
      const response = await TasksService.changeTaskStatus(options.taskId, options.status);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorPayload>;
      return rejectWithValue({
        message: error.response?.data.message || 'Unknown error',
      });
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: ITask, { rejectWithValue }) => {
    try {
      const response = await TasksService.createTask(task);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorPayload>;
      return rejectWithValue({
        message: error.response?.data.message || 'Unknown error',
      });
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: ITask, { rejectWithValue }) => {
    try {
      const response = await TasksService.updateTask(task);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorPayload>;
      return rejectWithValue({
        message: error.response?.data.message || 'Unknown error',
      });
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await TasksService.deleteTask(taskId);
    } catch (err) {
      const error = err as AxiosError<ErrorPayload>;
      return rejectWithValue({
        message: error.response?.data.message || 'Unknown error',
      });
    }
  }
);