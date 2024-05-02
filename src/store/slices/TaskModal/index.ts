import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskModalInitState } from "./initialState";
import { SelectesdDayType } from "./models";
import { createTask } from "../Tasks/thunks";

export const taskModal = createSlice({
  name: "taskModal",
  initialState: taskModalInitState,
  reducers: {
    setModalVisibility: (state, action) => {
      state.isModalVisible = action.payload;
    },

    setModalType : (state, action) => {
      state.modalParams.modalType = action.payload;
    },

    setModalParams: (state, action) => {
      state.modalParams = action.payload;
      state.isModalVisible = true;
    },

    setTaskPriority: (state, action) => {
      state.modalParams.taskInfo.priority = action.payload;
    },

    setRepeatDay: (state, action: PayloadAction<SelectesdDayType>) => {
      state.modalParams.taskInfo.repeatDays = state.modalParams.taskInfo.repeatDays.map(
        (item) => {
          return item.day === action.payload.day
            ? { ...item, isSelected: !item.isSelected }
            : item;
        }
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(createTask.pending, (state) => {
      state.modalParams = taskModalInitState.modalParams;
      state.isModalVisible = false;
    })
  },
});

export const {
  setModalVisibility,
  setModalParams,
  setTaskPriority,
  setRepeatDay,
  setModalType,
} = taskModal.actions;

export default taskModal.reducer;
