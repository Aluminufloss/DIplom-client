import { createSlice } from "@reduxjs/toolkit";
import { listsInitialState } from "./initialState";

import { addList, deleteList } from "./thunks";

export const listsInfo = createSlice({
  name: "listsInfo",
  initialState: listsInitialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.lists.unshift(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteList.pending, (state, action) => {
      state.lists = state.lists.filter((item) => item.listId !== action.meta.arg);
      state.isLoading = true;
    });

    builder.addCase(deleteList.fulfilled, (state) => {
      state.isLoading = false;
    });
  }
});

export const { setLists } = listsInfo.actions;

export default listsInfo.reducer;
