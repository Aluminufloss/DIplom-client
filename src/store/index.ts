import { configureStore } from "@reduxjs/toolkit";

import tabbedSidebar from "./slices/TabbedSidebar";
import userSidebar from "./slices/UserSidebar";
import taskModal from "./slices/TaskModal";
import userInfo from "./slices/User";
import tasks from "./slices/Tasks";
import lists from "./slices/Lists";

export const store = configureStore({
  reducer: {
    tabbedSidebar,
    userSidebar,
    taskModal,
    userInfo,
    lists,
    tasks
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
