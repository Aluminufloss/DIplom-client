import { configureStore } from "@reduxjs/toolkit";

import tabbedSidebar from "./slices/TabbedSidebar";
import userSidebar from "./slices/UserSidebar";
import taskModal from "./slices/TaskModal";

export const store = configureStore({
  reducer: {
    tabbedSidebar,
    userSidebar,
    taskModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
