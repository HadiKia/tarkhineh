import { combineReducers } from "redux";
import productsReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import favoriteReducer from "./favorite/favoriteReducer";

const rootReducer = combineReducers({
  productsState: productsReducer,
  cartState: cartReducer,
  favoriteState : favoriteReducer
});

export default rootReducer;
