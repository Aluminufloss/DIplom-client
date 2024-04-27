import { createSlice } from "@reduxjs/toolkit";

import { TasksInitialState } from "./initialState";
import { changeTaskStatus } from "./thunks";

const Tasks = createSlice({
  name: "tasks",
  initialState: TasksInitialState,
  reducers: {
    setTodayTasks: (state, action) => {
      state.todayTasks = action.payload;
    },
    setPlannedTasks: (state, action) => {
      state.plannedTasks = action.payload;
    },
    setAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeTaskStatus.pending, (state, action) => {
      state.isLoading = true;

      state.todayTasks = state.todayTasks.map((item) => {
        if (item.taskId === action.meta.arg.taskId) {
          return { ...item, status: action.meta.arg.status };
        }
        return item;
      });
    }),
      builder.addCase(changeTaskStatus.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(changeTaskStatus.rejected, (state, action) => {
        state.isLoading = false;

        state.todayTasks = state.todayTasks.map((item) => {
          if (item.taskId === action.meta.arg.taskId) {
            const oldStatus =
              action.meta.arg.status === "active" ? "completed" : "active";
            return { ...item, status: oldStatus };
          }
          return item;
        });
      });
  },
});

export const { setTodayTasks, setPlannedTasks, setAllTasks } = Tasks.actions;

export default Tasks.reducer;
