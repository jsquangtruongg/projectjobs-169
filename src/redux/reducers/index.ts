import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import globalReducer from "./global";
import blogCategory from "./blogCategory";
import blogReducer from "./blog";
import jobReducer from "./job";
import jobCategoryReducer from "./jobCategory";
import appLyReducer from "./apply";

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  user: userReducer,
  blogCategory: blogCategory,
  blog: blogReducer,
  job: jobReducer,
  jobCategory: jobCategoryReducer,
  apply: appLyReducer,
});

export default rootReducer;
