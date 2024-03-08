import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    auth: authReducer,
  },
});

export default store;
