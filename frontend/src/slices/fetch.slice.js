import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rerender: false,
  userRender: false,
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setRefetch: (state, action) => {
      state.rerender = action.payload;
    },
    refetchUser: (state, action) => {
      state.userRender = action.payload;
    },
  },
});

export const { setRefetch, refetchUser } = fetchSlice.actions;

export default fetchSlice.reducer;
