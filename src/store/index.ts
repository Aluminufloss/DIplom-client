import { configureStore } from "@reduxjs/toolkit";

import tabbedSidebar from "./slices/TabbedSidebar";
import userSidebar from "./slices/UserSidebar";
import taskModal from "./slices/TaskModal";
import userInfo from "./slices/User";

export const store = configureStore({
  reducer: {
    tabbedSidebar,
    userSidebar,
    taskModal,
    userInfo
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
