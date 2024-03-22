import { updateCart } from "@/utils/cart.utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], paymentMethod: "PayPal", shippingAddress: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((itm) => item._id === itm._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((itm) =>
          itm._id === existItem._id ? item : itm
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
  },
});

export const { removeFromCart, addToCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
