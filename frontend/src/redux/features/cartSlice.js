import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      const item = action.payload;
      const isItemExisted = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExisted) {
        state.cartItems = state.cartItems.map((i) => {
          if (i.product === item.product) {
            i.quantity += Number(item.quantity);
          }
          return i;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.product !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});
export default cartSlice.reducer;
export const { setCartItems, removeCartItem, saveShippingInfo, clearCart } =
  cartSlice.actions;
