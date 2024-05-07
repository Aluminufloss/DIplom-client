import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GroupType } from "@/models";

import { GroupInitialState } from "./initialState";
import { isFulfilledAction, isPendingAction, isRejectedAction } from "@/utils/checkReduxActions";
import { createTask } from "../Tasks/thunks";

export const groupsInfo = createSlice({
  name: "groupsInfo",
  initialState: GroupInitialState,
  reducers: {
    setGroups(state, action: PayloadAction<GroupType[]>) {
      state.groups = action.payload;
    },

    getListsByGroupId(state, action: PayloadAction<string>) {
      state.groups = state.groups.map((item) => {
        if (item.id === action.payload) {
          return { ...item, lists: item.lists };
        }
        return item;
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.rejected, () => {});
    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilledAction || isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setGroups, getListsByGroupId } = groupsInfo.actions;
export default groupsInfo.reducer;