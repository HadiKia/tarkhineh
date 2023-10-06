import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import favoriteReducer from "./favorite/favoriteReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  productsState: productsReducer,
  cartState: cartReducer,
  favoriteState : favoriteReducer,
  authState : authReducer
});

export default rootReducer;
