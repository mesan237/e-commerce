import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSliceReducer from "./slices/cart.slice";
import setCredentialsReducer from "./slices/auth.slice";
import fetchSliceReducer from "./slices/fetch.slice";

import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: setCredentialsReducer,
    fetch: fetchSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
