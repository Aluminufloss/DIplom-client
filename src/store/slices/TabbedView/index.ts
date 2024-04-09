import { createSlice } from "@reduxjs/toolkit";

export const tabbedView = createSlice({
	name: "tabbedView",
	initialState: {
		isViewVisible: true
	},
	reducers: {
		setModalVisibility: (state, action) => {
			state.isViewVisible = action.payload;
		}
	}
});

export const { setModalVisibility } = tabbedView.actions;

export default tabbedView.reducer;