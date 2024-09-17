import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import globalReducer from "./global";

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
