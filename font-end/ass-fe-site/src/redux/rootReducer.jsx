import { combineReducers } from "redux";
import AccountReducer from "./reducers/AccountReducer";
import commonReducer from "./reducers/commonReducer";
import SearchReducer from "./reducers/SearchReducer";
import CustomReducer from "./reducers/CustomReducer";
import PayReducer from "./reducers/PayReducer";
import Oderhistory from "./reducers/OderhistoryReducer";
const rootReducer = combineReducers({
  AccountReducer,
  commonReducer,
  SearchReducer,
  CustomReducer,
  PayReducer,
  Oderhistory,

});
export default rootReducer;
