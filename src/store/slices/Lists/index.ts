import { createSlice } from "@reduxjs/toolkit";
import { listsInitialState } from "./initialState";

import { addList, deleteList } from "./thunks";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "@/utils/checkReduxActions";
import { createTask } from "../Tasks/thunks";

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
