import { createSlice } from "@reduxjs/toolkit";
import { TasksInitialState } from "./initialState";
import { changeTaskStatus, createTask, deleteTask, updateTask } from "./thunks";
import { isDatesEqual } from "@/utils/dateUtils";
import { isFulfilledAction, isPendingAction, isRejectedAction } from "@/utils/checkReduxActions";

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
    builder
      .addCase(changeTaskStatus.pending, (state, action) => {
        state.todayTasks = state.todayTasks.map((item) => {
          if (item.taskId === action.meta.arg.taskId) {
            return { ...item, status: action.meta.arg.status };
          }
          return item;
        });
      })
      .addCase(changeTaskStatus.rejected, (state, action) => {
        state.todayTasks = state.todayTasks.map((item) => {
          if (item.taskId === action.meta.arg.taskId) {
            const oldStatus =
              action.meta.arg.status === "active" ? "completed" : "active";
            return { ...item, status: oldStatus };
          }
          return item;
        });
      })
      builder.addCase(createTask.fulfilled, (state, action) => {
        const task = action.payload;
        const plannedDate = task.plannedDate;
  
        if (isDatesEqual(new Date(plannedDate), new Date())) {
          state.todayTasks = [task, ...state.todayTasks];
        } else {
          state.plannedTasks.unshift(task);
        }
  
        state.allTasks = [task, ...state.allTasks];
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.allTasks = state.allTasks.filter(
          (item) => item.taskId !== action.meta.arg
        );

        state.todayTasks = state.todayTasks.filter(
          (item) => item.taskId !== action.meta.arg
        );

        state.plannedTasks = state.plannedTasks.filter(
          (item) => item.taskId !== action.meta.arg
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;

        state.todayTasks = state.todayTasks.map((item) =>
          item.taskId === updatedTask.taskId ? updatedTask : item
        );

        state.plannedTasks = state.plannedTasks.map((item) =>
          item.taskId === updatedTask.taskId ? updatedTask : item
        );

        state.allTasks = state.allTasks.map((item) =>
          item.taskId === updatedTask.taskId ? updatedTask : item
        );
      });
      builder.addMatcher(isFulfilledAction, (state) => {
        state.isLoading = false;
      });
      builder.addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
      });
      builder.addMatcher(isRejectedAction, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setTodayTasks, setPlannedTasks, setAllTasks } = Tasks.actions;

export default Tasks.reducer;