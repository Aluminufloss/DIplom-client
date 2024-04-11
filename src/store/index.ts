import { configureStore } from "@reduxjs/toolkit";

import tabbedSidebar from "./slices/TabbedSidebar";
import userSidebar from "./slices/UserSidebar";
import taskSidebar from "./slices/TaskSidebar";

export const store = configureStore({
  reducer: {
    tabbedSidebar,
    userSidebar,
    taskSidebar,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
