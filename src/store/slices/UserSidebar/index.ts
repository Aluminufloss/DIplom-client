import { createSlice } from "@reduxjs/toolkit";

export const userSidebar = createSlice({
	name: "tabbedSidebar",
	initialState: {
		isViewVisible: false
	},
	reducers: {
		toggleUserSidebarVisibility: (state) => {
			state.isViewVisible = !state.isViewVisible;
		}
	}
});

export const { toggleUserSidebarVisibility } = userSidebar.actions;

export default userSidebar.reducer;