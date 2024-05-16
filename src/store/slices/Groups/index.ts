import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GroupType } from "@/models";
import { addGroup, addListToGroup, deleteGroup, removeListFromGroup } from "./thunks";

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
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      const deletedGroupId = action.meta.arg;
      state.groups = state.groups.filter((item) => item.id !== deletedGroupId);
    });
    builder.addCase(addGroup.fulfilled, (state, action: PayloadAction<GroupType>) => {
      state.groups = [action.payload, ...state.groups];
    });
    builder.addCase(addListToGroup.fulfilled, (state, action) => {
      console.log('sussy', action)
      state.groups = state.groups.map((item) => {
        if (item.id === action.meta.arg.groupId) {
          return { ...item, lists: [...item.lists, action.payload] };
        }
        return item;
      })
    });
    builder.addCase(removeListFromGroup.fulfilled, (state, action) => {
      const group = state.groups.find((item) => item.id === action.meta.arg.groupId);

      if (group) {
        group.lists = group.lists.filter((item) => item.listId !== action.meta.arg.listId);
      }

      state.groups = [...state.groups];
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

export const { setGroups, getListsByGroupId } = groupsInfo.actions;
export default groupsInfo.reducer;