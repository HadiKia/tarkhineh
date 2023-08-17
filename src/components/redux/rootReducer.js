import { combineReducers } from "redux";
import productsReducer from './products/productsReducer'

const rootReducer = combineReducers({
    productsState : productsReducer
})

export default rootReducer