import { createSlice } from "@reduxjs/toolkit";
import { taskModalInitState } from "./initialState";

export const taskModal = createSlice({
  name: "taskModal",
  initialState: taskModalInitState,
  reducers: {
    setModalVisibility: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },

    setModalParams: (state, action) => {
      state.modalParams = action.payload;
    },
  },
});

export const { setModalVisibility } = taskModal.actions;

export default taskModal.reducer;
