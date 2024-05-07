import { createSlice } from "@reduxjs/toolkit";

import { initialAppState } from "./initialState";
import { createTask } from "../Tasks/thunks";
import { isFulfilledAction, isPendingAction, isRejectedAction } from "@/utils/checkReduxActions";

const AppState = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: { },
  extraReducers(builder) {
    builder.addCase(createTask.pending, () => {}),
    builder.addCase(createTask.fulfilled, () => {}),
    builder.addCase(createTask.rejected, () => {});

    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    }),
    builder.addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
    }),
    builder.addMatcher(isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export default AppState.reducer;