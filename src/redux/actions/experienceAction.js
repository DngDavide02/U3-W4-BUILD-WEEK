import { addExperience, removeExperience, setError, setExperiences, setLoading, updateExperience } from "../reducers/experienceSlice";

// URL base API e token dall'ambiente
const API_URL = "https://striveschool-api.herokuapp.com/api/profile";
const token = import.meta.env.VITE_TOKEN;

/**
 * FETCH ESPERIENZE (GET)
 * Prende le esperienze di un utente tramite API,
 * aggiorna lo stato con loading, dati o errore.
 */
export const fetchExperiences = (userId) => async (dispatch) => {
  dispatch(setLoading()); // Setta loading = true
  try {
    const res = await fetch(`${API_URL}/${userId}/experiences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setExperiences(data)); // Aggiorna lo stato con le esperienze
  } catch (err) {
    dispatch(setError(err.message)); // Se errore, aggiorna errore
  }
};

/**
 * CREA NUOVA ESPERIENZA (POST)
 * Invia i dati di una nuova esperienza,
 * se ok aggiorna lo stato aggiungendo l'esperienza.
 */
export const createExperience = (userId, newExp) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/${userId}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newExp),
    });

    if (!res.ok) throw new Error("Errore nel creare l'esperienza");

    const data = await res.json();
    dispatch(addExperience(data)); // Aggiunge esperienza allo stato
  } catch (error) {
    dispatch(setError(error.message)); // Setta errore in caso di problema
  }
};

/**
 * AGGIORNA ESPERIENZA (PUT)
 * Modifica un'esperienza esistente tramite API,
 * se ok aggiorna lo stato con i nuovi dati.
 */
export const editExperience = (userId, expId, updatedExp) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences/${expId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExp),
    });
    if (!response.ok) {
      throw new Error("Errore nell'aggiornamento dell'esperienza");
    }
    const data = await response.json();
    dispatch(updateExperience(data)); // Aggiorna esperienza nello stato
  } catch (error) {
    dispatch(setError(error.message));
    console.error("Errore durante l'aggiornamento dell'esperienza:", error);
  }
};

/**
 * CANCELLA ESPERIENZA (DELETE)
 * Elimina un'esperienza tramite API,
 * se ok rimuove l'esperienza dallo stato.
 */
export const deleteExperience = (userId, expId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences/${expId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella cancellazione dell'esperienza");
    }

    dispatch(removeExperience(expId)); // Rimuove esperienza dallo stato
  } catch (error) {
    dispatch(setError(error.message));
    console.error("Errore durante la cancellazione dell'esperienza:", error);
  }
};
