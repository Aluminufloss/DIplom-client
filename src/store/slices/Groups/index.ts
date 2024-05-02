import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GroupType } from "@/models";

import { GroupInitialState } from "./initialState";

export const groupsInfo = createSlice({
  name: "groupsInfo",
  initialState: GroupInitialState,
  reducers: {
    setGroups(state, action: PayloadAction<GroupType[]>) {
      state.groups = action.payload;
    }
  }
});

export const { setGroups } = groupsInfo.actions;
export default groupsInfo.reducer;