import { createSlice } from "@reduxjs/toolkit";
import { tabbedViewInitialState } from "./initialState";

export const taskSidebar = createSlice({
  name: "taskSidebar",
  initialState: tabbedViewInitialState,
  reducers: {
    toggleTaskSidebarVisibility: (state) => {
      state.isViewVisible = !state.isViewVisible;
    },

		setSidebarParams: (state, action) => {
			
		}
  },
});

export const { toggleTaskSidebarVisibility } = taskSidebar.actions;

export default taskSidebar.reducer;
