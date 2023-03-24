import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nikname: null,
  },
  reducers: {
    updateUserProfile(state, { payload }) {
      console.log("payload:", payload);

      return { ...state, userId: payload };
    },
  },
});

export const { updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
