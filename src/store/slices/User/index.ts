import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./initialState";

const userInfo = createSlice({
  name: "userDataInfo",
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.id = action.payload.id;
    }

  }
});

export const { setUserData } = userInfo.actions;

export default userInfo.reducer;
