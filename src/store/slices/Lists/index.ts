import { createSlice, current } from "@reduxjs/toolkit";
import { listsInitialState } from "./initialState";

import { addList, deleteList } from "./thunks";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "@/utils/checkReduxActions";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  updateTask,
} from "../Tasks/thunks";
import { addListToGroup } from "../Groups/thunks";

export const listsInfo = createSlice({
  name: "listsInfo",
  initialState: listsInitialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },

    setListsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addList.fulfilled, (state, action) => {
      state.lists.unshift(action.payload);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.lists = state.lists.filter(
        (item) => item.listId !== action.meta.arg
      );
    });
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        const listId = action.meta.arg.listId;

        if (!listId) {
          return;
        }

        const task = action.payload;

        const currentList = state.lists.find((list) => {
          return list.listId === listId[0];
        });

        if (!currentList) {
          return;
        }

        currentList.tasks = [task, ...currentList.tasks];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.meta.arg.pageType !== "list") {
          return;
        }

        const currentList = state.lists.find(
          (list) => list.listId === action.meta.arg.listId
        );

        if (currentList) {
          currentList.tasks = currentList.tasks.filter(
            (item) => item.taskId !== action.meta.arg.taskId
          );
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;

        const currentList =
          updatedTask.listId?.length === 1
            ? state.lists.find(
                (list) => list.listId === updatedTask.listId?.[0]
              )
            : state.lists.find((list) =>
                list.tasks.some((item) => item.taskId === updatedTask.taskId)
              );

        if (!currentList) {
          return;
        }

        if (updatedTask.listId?.length !== 1) {
          currentList.tasks = currentList.tasks.filter((item) => {
            return item.taskId !== updatedTask.taskId;
          });

          return;
        }

        const taskIndex = currentList?.tasks.findIndex(
          (item) => item.taskId === action.meta.arg.taskId
        );

        if (taskIndex === -1) {
          currentList.tasks = [action.payload, ...currentList.tasks];
          return;
        }

        currentList.tasks[taskIndex] = action.payload;
      });
    builder.addCase(changeTaskStatus.pending, (state, action) => {
      const task = action.meta.arg.task;

      if (task.listId?.length !== 1) {
        return;
      }

      const currentList = state.lists.find(
        (list) => list.listId === task.listId?.[0]
      );

      if (!currentList) {
        return;
      }

      currentList.tasks = currentList.tasks.map((item) => {
        if (item.taskId === task.taskId) {
          return {
            ...item,
            status: action.meta.arg.status,
          };
        }
        return item;
      });
    });
    builder.addCase(changeTaskStatus.rejected, (state, action) => {
      if (action.meta.arg.task.listId?.length !== 1) {
        return;
      }

      const currentList = state.lists.find(
        (list) => list.listId === action.meta.arg.task.listId?.[0]
      );

      if (!currentList) {
        return;
      }

      currentList.tasks = currentList.tasks.filter((task) => {
        return task.taskId !== action.meta.arg.task.taskId;
      });
    });
    builder.addCase(addListToGroup.fulfilled, (state, action) => {
      state.lists = [action.payload, ...state.lists];
    });
    builder.addCase(createTask.rejected, () => {});
    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilledAction || isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setLists, setListsLoading } = listsInfo.actions;

export default listsInfo.reducer;
