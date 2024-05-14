import { createSlice } from "@reduxjs/toolkit";
import { listsInitialState } from "./initialState";

import { addList, deleteList } from "./thunks";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "@/utils/checkReduxActions";
import { createTask, deleteTask } from "../Tasks/thunks";

export const listsInfo = createSlice({
  name: "listsInfo",
  initialState: listsInitialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.unshift(action.payload);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.lists = state.lists.filter(
        (item) => item.listId !== action.meta.arg
      );
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const currentList = state.lists.find(
        (list) => list.listId === action.meta.arg.listId
      );

      if (currentList) {
        currentList.tasks = currentList.tasks.filter(
          (item) => item.taskId !== action.meta.arg.taskId
        );
      }
    });
    builder.addCase(createTask.rejected, () => {});
    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilledAction || isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setLists } = listsInfo.actions;

export default listsInfo.reducer;
