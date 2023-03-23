import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nikname: null,
    reducers: {},
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
