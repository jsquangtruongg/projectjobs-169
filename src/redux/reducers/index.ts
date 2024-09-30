import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import globalReducer from "./global";
import blogCategory from "./blogCategory";
import blogReducer from "./blog";
import job from "./job";
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  user: userReducer,
  blogCategory: blogCategory,
  blog: blogReducer,
  job: job,
});

export default rootReducer;
