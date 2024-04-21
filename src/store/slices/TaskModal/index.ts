import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskModalInitState } from "./initialState";
import { SelectesdDayType } from "./models";

export const taskModal = createSlice({
  name: "taskModal",
  initialState: taskModalInitState,
  reducers: {
    setModalVisibility: (state, action) => {
      state.isModalVisible = action.payload;
    },

    setModalParams: (state, action) => {
      state.modalParams = action.payload;
    },

    setTaskPriority: (state, action) => {
      state.modalParams.priority = action.payload;
    },

    setRepeatDay: (state, action: PayloadAction<SelectesdDayType>) => {
      state.modalParams.repeatDays.days = state.modalParams.repeatDays.days.map(
        (item) => {
          return item.day === action.payload.day
            ? { ...item, isSelected: !item.isSelected }
            : item;
        }
      );
    },
  },
});

export const {
  setModalVisibility,
  setModalParams,
  setTaskPriority,
  setRepeatDay,
} = taskModal.actions;

export default taskModal.reducer;
