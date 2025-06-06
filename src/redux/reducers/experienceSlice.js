import { createSlice } from "@reduxjs/toolkit";

// Definisce lo slice per la gestione delle esperienze lavorative
const experienceSlice = createSlice({
  name: "experience", // nome dello slice (usato per action types)
  initialState: {
    experiences: [], // array di esperienze
    loading: false, // flag per loading (caricamento)
    error: null, // eventuale errore
  },
  reducers: {
    // Imposta l'array di esperienze e resetta loading ed error
    setExperiences: (state, action) => {
      state.experiences = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Indica che è in corso un caricamento, resetta l'errore
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Imposta un errore e ferma il loading
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Aggiunge una nuova esperienza all'array e resetta loading/error
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    // Rimuove un'esperienza filtrando per _id e resetta loading/error
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((exp) => exp._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    // Aggiorna un'esperienza sostituendo quella con lo stesso _id
    updateExperience: (state, action) => {
      state.experiences = state.experiences.map((exp) => (exp._id === action.payload._id ? action.payload : exp));
      state.loading = false;
      state.error = null;
    },
  },
});

// Esporta le action creators generate automaticamente
export const { setExperiences, setLoading, setError, addExperience, removeExperience, updateExperience } = experienceSlice.actions;

// Esporta il reducer da usare nella store Redux
export default experienceSlice.reducer;
