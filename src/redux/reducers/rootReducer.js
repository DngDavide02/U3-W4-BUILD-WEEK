import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

// Combina più reducer in un unico reducer principale (rootReducer)
const rootReducer = combineReducers({
  // Lo slice 'user' sarà gestito da userReducer
  user: userReducer,
});

export default rootReducer;
