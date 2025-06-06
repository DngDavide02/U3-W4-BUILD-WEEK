//experienceSlice.js ==> defines synchronous actions and reducers

// createSlice create an initial state,
// a reducer set (functions to change/update the state)
// automatically generates actions
import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
  name: "experience",
  initialState: { experiences: [], loading: false, error: null },
  reducers: {
    // action creator to set experiences list (after a GET), reset loading and error.
    setExperiences: (state, action) => {
      state.experiences = action.payload;
      state.loading = false;
      state.error = null;
    },
    // action creator to set the loading state
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // action creator to set the error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // action creator to add a new experience (POST)
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    // action creator to remove an experience by the _id (DELETE)
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((exp) => exp._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    // map through the experiences by their _id and replaces it with the updated one. (PUT)
    updateExperience: (state, action) => {
      state.experiences = state.experiences.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
      state.loading = false;
      state.error = null;
    }
  }
});
// action functions to use in components to modify state.
export const { setExperiences, setLoading, setError, addExperience, removeExperience, updateExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
// reducer to export in the store 👇
/* configureStore({
  reducer: {
    experience: experienceReducer
  }
}); */
