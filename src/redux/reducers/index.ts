import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import globalReducer from "./global";
import blogCategory from "./blogCategory";
import blogData from "./blog";
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  user: userReducer,
  blogCategory: blogCategory,
  blogData: blogData,
});

export default rootReducer;
