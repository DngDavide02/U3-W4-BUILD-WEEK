import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
  name: "experience",
  initialState: { experiences: [] },
  reducers: {
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
    },
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((exp) => exp._id !== action.payload);
    },
    updateExperience: (state, action) => {
      state.experiences = state.experiences.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
    }
  }
});

export const { addExperience, removeExperience, updateExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
