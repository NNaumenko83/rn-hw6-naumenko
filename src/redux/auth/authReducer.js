import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickName: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile(state, { payload }) {
      console.log("payload:", payload);

      return { ...state, userId: payload.userId, nickName: payload.nickName };
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
  },
});

export const { updateUserProfile, authStateChange } = authSlice.actions;

export default authSlice.reducer;
