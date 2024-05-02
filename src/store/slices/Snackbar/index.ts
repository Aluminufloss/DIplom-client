import { createSlice } from "@reduxjs/toolkit";
import { SnackbarInitialState } from "./initialState";

export const snackbarInfo = createSlice({
  name: "snackbarInfo",
  initialState: SnackbarInitialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      state.message = "";
    }
  }
});

export const { openSnackbar, closeSnackbar } = snackbarInfo.actions;
export default snackbarInfo.reducer;