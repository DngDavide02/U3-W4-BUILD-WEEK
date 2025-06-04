import { addExperience, removeExperience, updateExperience } from "../reducers/experienceSlice";

const API_URL = "https://striveschool-api.herokuapp.com/api/profile";
const token = import.meta.env.VITE_TOKEN;

export const fetchExperience = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Errore nel recupero delle esperienze");
    }
    const data = await response.json();
    data.forEach((exp) => dispatch(addExperience(exp)));
  } catch (error) {
    console.error("Errore nel recupero delle esperienze:", error);
  }
};

export const createExperience = (userId, experience, imageFile) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(experience)
    });
    if (!response.ok) {
      throw new Error("Errore nel salvataggio dell'esperienza");
    }
    const data = await response.json();
    dispatch(addExperience(data));
    /* immagine */
    if (imageFile) {
      const formData = new FormData();
      formData.append("experience", imageFile);

      const imageResponse = await fetch(`${API_URL}/${userId}/experiences/${data._id}/picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!imageResponse.ok) {
        throw new Error("Errore nel caricamento dell'immagine");
      }

      const imageData = await imageResponse.json();

      data.image = imageData.url;
    } else {
      data.image = null;
    }

    dispatch(addExperience(data));
  } catch (error) {
    console.error("Errore durante la creazione dell'esperienza:", error);
  }
};

export const editExperience = (userId, expId, updateExp) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/experiences/${expId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updateExp)
    });
    if (!response.ok) {
      throw new Error("Errore nell'aggiornamento dell'esperienza");
    }
    const data = await response.json();
    dispatch(updateExperience(data));
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'esperienza:", error);
  }
};

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
    console.error("Errore durante la cancellazione dell'esperienza:", error);
  }
};
