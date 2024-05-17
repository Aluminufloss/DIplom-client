import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PagesEnum } from "@/models";
import { ITask } from "@/api/models/Response/Tasks/ITask";

import { isDatesEqual } from "@/utils/dateUtils";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "@/utils/checkReduxActions";

import { changeTaskStatus, createTask, deleteTask, updateTask } from "./thunks";

import { TasksInitialState } from "./initialState";

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

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    sortTasksByPriority: (
      state,
      action: PayloadAction<{ pageType: PagesEnum }>
    ) => {
      const { pageType } = action.payload;
      const priorityOrder: { [key: string]: number } = {
        high: 3,
        medium: 2,
        low: 1,
      };

      switch (pageType) {
        case PagesEnum.today:
          state.todayTasks = state.todayTasks.sort(
            (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
          );
          break;
        case PagesEnum.planned:
          state.plannedTasks = state.plannedTasks.sort(
            (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
          );
          break;
        case PagesEnum.all:
          state.allTasks = state.allTasks.sort(
            (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
          );
          break;
        default: {
          break;
        }
      }
    },

    sortTasksByCategory: (
      state,
      action: PayloadAction<{ pageType: PagesEnum }>
    ) => {
      const { pageType } = action.payload;

      const sortByCategory = (tasks: ITask[]) => {
        return tasks.sort((a, b) => {
          const categoryA = a.category || "";
          const categoryB = b.category || "";
          return categoryA.localeCompare(categoryB);
        });
      };

      switch (pageType) {
        case PagesEnum.today:
          state.todayTasks = sortByCategory(state.todayTasks);
          break;
        case PagesEnum.planned:
          state.plannedTasks = sortByCategory(state.plannedTasks);
          break;
        case PagesEnum.all:
          state.allTasks = sortByCategory(state.allTasks);
          break;
        default:
          break;
      }
    },

    sortTasksByTitle: (
      state,
      action: PayloadAction<{ pageType: PagesEnum }>
    ) => {
      const { pageType } = action.payload;

      const sortByTitle = (tasks: ITask[]) => {
        return tasks.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return titleA.localeCompare(titleB);
        });
      };

      switch (pageType) {
        case PagesEnum.today:
          state.todayTasks = sortByTitle(state.todayTasks);
          break;
        case PagesEnum.planned:
          state.plannedTasks = sortByTitle(state.plannedTasks);
          break;
        case PagesEnum.all:
          state.allTasks = sortByTitle(state.allTasks);
          break;
        default:
          break;
      }
    },

    sortTasksByDate: (
      state,
      action: PayloadAction<{ pageType: PagesEnum }>
    ) => {
      const { pageType } = action.payload;

      const sortByDate = (tasks: ITask[]) => {
        return tasks.sort(
          (a, b) =>
            new Date(b.plannedDate).getTime() -
            new Date(a.plannedDate).getTime()
        );
      };

      switch (pageType) {
        case PagesEnum.today:
          state.todayTasks = sortByDate(state.todayTasks);
          break;
        case PagesEnum.planned:
          state.plannedTasks = sortByDate(state.plannedTasks);
          break;
        case PagesEnum.all:
          state.allTasks = sortByDate(state.allTasks);
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeTaskStatus.pending, (state, action) => {
        const task = action.meta.arg.task;
        const newStatus = action.meta.arg.status;

        if (task.listId?.length === 1) {
          return;
        }

        state.allTasks = state.allTasks.map((item) => {
          if (item.taskId === task.taskId) {
            return {
              ...item,
              status: newStatus,
              plannedDate: new Date().toISOString(),
            };
          }
          return item;
        });

        if (isDatesEqual(new Date(task.plannedDate), new Date())) {
          state.todayTasks = state.todayTasks.map((item) => {
            if (item.taskId === task.taskId) {
              return {
                ...item,
                status: newStatus,
                plannedDate: new Date().toISOString(),
              };
            }
            return item;
          });
        } else {
          state.plannedTasks = state.plannedTasks.map((item) => {
            console.log("planned item", item.title);
            if (item.taskId === task.taskId) {
              return {
                ...item,
                status: newStatus,
                plannedDate: new Date().toISOString(),
              };
            }
            return item;
          });
        }
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const task = action.meta.arg.task;
        const updatedTask = action.payload;

        if (task.listId?.length === 3) {
          return;
        }

        if (isDatesEqual(new Date(task.plannedDate), new Date())) {
          state.todayTasks = state.todayTasks.map((item) => {
            if (item.taskId === task.taskId) {
              return updatedTask;
            }
            return item;
          });
        } else {
          state.plannedTasks = state.plannedTasks.map((item) => {
            if (item.taskId === task.taskId) {
              return updatedTask;
            }
            return item;
          });
        }

        state.allTasks = state.allTasks.map((item) => {
          if (item.taskId === task.taskId) {
            return updatedTask;
          }
          return item;
        });
      })
      .addCase(changeTaskStatus.rejected, (state, action) => {
        const task = action.meta.arg.task;
        const newStatus = action.meta.arg.status;
        const oldStatus = newStatus === "completed" ? "active" : "completed";

        if (task.listId?.length === 3) {
          return;
        }

        if (isDatesEqual(new Date(task.plannedDate), new Date())) {
          state.todayTasks = state.todayTasks.map((item) => {
            if (item.taskId === task.taskId) {
              return {
                ...item,
                status: oldStatus,
                plannedDate: task.plannedDate,
              };
            }
            return item;
          });
        } else {
          state.plannedTasks = state.plannedTasks.map((item) => {
            if (item.taskId === task.taskId) {
              return {
                ...item,
                status: oldStatus,
                plannedDate: task.plannedDate,
              };
            }
            return item;
          });
        }

        state.allTasks = state.allTasks.map((item) => {
          if (item.taskId === task.taskId) {
            return {
              ...item,
              status: oldStatus,
              plannedDate: task.plannedDate,
            };
          }
          return item;
        });
      });
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        const task = action.payload;

        if (task.listId?.length !== 3) {
          const plannedDate = task.plannedDate;

          if (isDatesEqual(new Date(plannedDate), new Date())) {
            state.todayTasks = [task, ...state.todayTasks];
          } else {
            state.plannedTasks = [task, ...state.plannedTasks];
          }

          state.allTasks = [task, ...state.allTasks];
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.meta.arg.listId) {
          return;
        }

        const task = state.allTasks.find(
          (item) => item.taskId === action.meta.arg.taskId
        );

        if (task) {
          if (isDatesEqual(new Date(task?.plannedDate), new Date())) {
            state.todayTasks = state.todayTasks.filter(
              (item) => item.taskId !== task.taskId
            );
          } else {
            state.plannedTasks = state.plannedTasks.filter(
              (item) => item.taskId !== task.taskId
            );
          }
        }

        state.allTasks = state.allTasks.filter(
          (item) => item.taskId !== action.meta.arg.taskId
        );
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;

        if (updatedTask.listId?.length === 3) {
          return;
        }

        if (isDatesEqual(new Date(updatedTask.plannedDate), new Date())) {
          state.todayTasks = state.todayTasks.map((item) => {
            if (item.taskId === updatedTask.taskId) {
              return updatedTask;
            }
            return item;
          });
        } else {
          state.plannedTasks = state.plannedTasks.map((item) => {
            if (item.taskId === updatedTask.taskId) {
              return updatedTask;
            }
            return item;
          });
        }

        state.allTasks = state.allTasks.map((item) => {
          if (item.taskId === updatedTask.taskId) {
            return updatedTask;
          }
          return item;
        });
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

export const {
  setTodayTasks,
  setPlannedTasks,
  setAllTasks,
  sortTasksByCategory,
  sortTasksByDate,
  sortTasksByPriority,
  sortTasksByTitle,
  setSearchValue,
} = Tasks.actions;

export default Tasks.reducer;
