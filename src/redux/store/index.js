import { configureStore, combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "../reducers/experienceSlice";

const initialUserState = { profile: null };
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  experience: experienceReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;

export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile
});
