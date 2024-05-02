"use client";

import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ListsService from "@/api/services/ListsService";

import { ErrorPayload, ServerErrorMessage } from "./models";

export const addList = createAsyncThunk(
  "lists/addList",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await ListsService.addList(title);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId: string, { rejectWithValue }) => {
    try {
      const response = await ListsService.deleteList(listId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ServerErrorMessage>;
      return rejectWithValue({
        message: error.response?.data.message,
      } as ErrorPayload);
    }
  }
);
