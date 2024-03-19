export const updateCart = (state) => {
  // calcul itemPrice
  state.itemPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  // calcul taxPrice
  state.taxPrice = Number(0.15 * state.itemPrice).toFixed(0);
  // calcul shippingPrice
  state.shippingPrice = state.itemPrice > 10000 ? 2000 : 1000;
  // calcul totalPrice
  state.totalPrice = Number(
    state.itemPrice + state.shippingPrice + Number(state.taxPrice)
  ).toFixed(0);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
