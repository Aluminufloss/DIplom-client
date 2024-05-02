import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SnackbarOpenActionDataType } from "./models";

import { SnackbarInitialState } from "./initialState";

export const snackbarInfo = createSlice({
  name: "snackbarInfo",
  initialState: SnackbarInitialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarOpenActionDataType>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
      state.message = "";
      state.title = "";
      state.type = "success";
    }
  }
});

export const { openSnackbar, closeSnackbar } = snackbarInfo.actions;
export default snackbarInfo.reducer;