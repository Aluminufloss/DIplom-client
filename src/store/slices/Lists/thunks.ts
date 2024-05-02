"use client";

import ListsService from "@/api/services/ListsService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addList = createAsyncThunk(
  "lists/addList",
  async (title: string) => {
    const response = await ListsService.addList(title);
    return response.data;
  }
)

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId: string) => {
    const response = await ListsService.deleteList(listId);
    return response.data;
  }
)