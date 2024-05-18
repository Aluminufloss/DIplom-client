import { configureStore } from "@reduxjs/toolkit";

import tabbedSidebar from "./slices/TabbedSidebar";
import userSidebar from "./slices/UserSidebar";
import taskModal from "./slices/TaskModal";
import userInfo from "./slices/User";
import tasks from "./slices/Tasks";
import lists from "./slices/Lists";
import snackbar from "./slices/Snackbar";
import groups from "./slices/Groups";
import appState from "./slices/AppState";

import urlChangeMiddleware from "./slices/TaskModal/middleware";

export const store = configureStore({
  reducer: {
    tabbedSidebar,
    userSidebar,
    taskModal,
    appState,
    snackbar,
    userInfo,
    groups,
    lists,
    tasks,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(urlChangeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
