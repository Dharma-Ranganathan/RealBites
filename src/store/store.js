import { combineReducers, configureStore } from "@reduxjs/toolkit";
import testimonialReducer from "./testimonialSlice.js";
import bitesReducer from "./bitesSlice.js";
import userReducer from "./usersSlice.js";

const reducer = combineReducers({
  testimonial: testimonialReducer,
  bites: bitesReducer,
  users: userReducer,
});

export const store = configureStore({
  reducer,
});
