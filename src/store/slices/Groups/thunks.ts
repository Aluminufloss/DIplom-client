import { AxiosError } from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupService } from "@/api/services/GroupService";

import { ErrorPayload, ServerErrorMessage } from "../Lists/models";

export const addGroup = createAsyncThunk(
  "groups/addGroup",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await GroupService.createGroup(name);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);

export const updateGroupName = createAsyncThunk(
  "groups/updateGroupName",
  async (options: { name: string; groupId: string }, { rejectWithValue }) => {
    try {
      const response = await GroupService.updateGroupName(options);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);

export const removeListFromGroup = createAsyncThunk(
  "groups/removeListFromGroup",
  async (options: { groupId: string; listId: string }, { rejectWithValue }) => {
    try {
      const response = await GroupService.removeListFromGroup(options);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);

export const addListToGroup = createAsyncThunk(
  "groups/addListToGroup",
  async (options: { groupId: string; listName: string }, { rejectWithValue }) => {
    try {
      const response = await GroupService.addListToGroup(options);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await GroupService.deleteGroup(groupId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);
