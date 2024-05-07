import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { taskModalInitState } from "./initialState";
import { SelectesdDayType, TaskModalStoreType } from "./models";
import { createTask, deleteTask, updateTask } from "../Tasks/thunks";

export const taskModal = createSlice({
  name: "taskModal",
  initialState: taskModalInitState,
  reducers: {
    setModalVisibility: (state, action) => {
      state.isModalVisible = action.payload;
    },

    setModalType: (state, action) => {
      state.modalParams.modalType = action.payload;
    },

    setModalParams: (state, action) => {
      state.modalParams = action.payload;
      state.isModalVisible = true;
    },

    setTaskPriority: (state, action) => {
      state.modalParams.taskInfo.priority = action.payload;
    },

    resetModalState: (state) => {
      state.modalParams = taskModalInitState.modalParams;
      state.isModalVisible = false;
    },

    setRepeatDay: (state, action: PayloadAction<SelectesdDayType>) => {
      state.modalParams.taskInfo.repeatDays =
        state.modalParams.taskInfo.repeatDays.map((item) => {
          return item.day === action.payload.day
            ? { ...item, isSelected: !item.isSelected }
            : item;
        });
    },
  },
  extraReducers(builder) {
    const handleFulfilled = (state: TaskModalStoreType) => {
      state.modalParams = taskModalInitState.modalParams;
      state.isModalVisible = false;
    };

    builder
      .addCase(createTask.fulfilled, handleFulfilled)
      .addCase(updateTask.fulfilled, handleFulfilled)
      .addCase(deleteTask.fulfilled, handleFulfilled);
  },
});

export const {
  resetModalState,
  setModalVisibility,
  setModalParams,
  setTaskPriority,
  setRepeatDay,
  setModalType,
} = taskModal.actions;

export default taskModal.reducer;
