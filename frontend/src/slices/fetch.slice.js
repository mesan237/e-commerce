import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rerender: false,
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setRefetch: (state, action) => {
      state.rerender = action.payload;
    },
  },
});

export const { setRefetch } = fetchSlice.actions;

export default fetchSlice.reducer;
