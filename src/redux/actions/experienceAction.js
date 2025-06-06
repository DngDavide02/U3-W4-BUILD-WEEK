// experienceAction.js ==> defines asynchronous logic (HTTP calls using redux-thunk)

// import action creators from experienceSlice.js
import { addExperience, removeExperience, setError, setExperiences, setLoading, updateExperience } from "../reducers/experienceSlice";

const API_URL = "https://striveschool-api.herokuapp.com/api/profile";
const token = import.meta.env.VITE_TOKEN;

// GET: Fetch experiences for a specific user
export const fetchExperiences = (userId) => async (dispatch) => {
  dispatch(setLoading()); // Set loading: true while the request is in progress
  try {
    const res = await fetch(`${API_URL}/${userId}/experiences`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Errore nel recupero delle esperienze");
    }
    const data = await res.json();
    dispatch(setExperiences(data));
    // dispatch({ type: "experience/setExperiences", payload: data })
  } catch (err) {
    dispatch(setError(err.message)); // Save error message to Redux state
  }
};

// POST: Create a new experience
export const createExperience = (userId, newExp) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/${userId}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newExp) // Convert the new experience object into a JSON string
    });

    if (!res.ok) throw new Error("Errore nel creare l'esperienza");

    const data = await res.json();
    dispatch(addExperience(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

//  PUT: Update an existing experience
export const editExperience = (userId, expId, updatedExp) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences/${expId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExp)
    });
    if (!response.ok) {
      throw new Error("Errore nell'aggiornamento dell'esperienza");
    }
    const data = await response.json();
    dispatch(updateExperience(data));
    return data;
  } catch (error) {
    dispatch(setError(error.message));
    console.error("Errore durante l'aggiornamento dell'esperienza:", error);
  }
};

// DELETE: Remove an experience
export const deleteExperience = (userId, expId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences/${expId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Errore nella cancellazione dell'esperienza");
    }

    dispatch(removeExperience(expId));
  } catch (error) {
    dispatch(setError(error.message));

    console.error("Errore durante la cancellazione dell'esperienza:", error);
  }
};
