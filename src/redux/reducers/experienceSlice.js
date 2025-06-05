import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
  name: "experience",
  initialState: { experiences: [], loading: false, error: null },
  reducers: {
    setExperiences: (state, action) => {
      state.experiences = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((exp) => exp._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    updateExperience: (state, action) => {
      state.experiences = state.experiences.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setExperiences, setLoading, setError, addExperience, removeExperience, updateExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
