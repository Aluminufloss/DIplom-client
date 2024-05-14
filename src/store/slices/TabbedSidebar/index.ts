import { createSlice } from "@reduxjs/toolkit";
import { tabbedViewInitialState } from "./initialState";

export const tabbedSidebar = createSlice({
  name: "tabbedSidebarInfo",
  initialState: tabbedViewInitialState,
  reducers: {
    toggleTabbedSidebarVisibility: (state) => {
      state.isViewVisible = !state.isViewVisible;
    },

    setSelectedTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { toggleTabbedSidebarVisibility, setSelectedTab } =
  tabbedSidebar.actions;

export default tabbedSidebar.reducer;
