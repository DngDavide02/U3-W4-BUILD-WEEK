// Token di autorizzazione preso dalle variabili d'ambiente
const token = import.meta.env.VITE_TOKEN;

/**
 * Action creator per settare il profilo utente nello stato Redux
 * @param {Object} profile - dati del profilo utente
 * @returns {Object} action Redux
 */
export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});

/**
 * Thunk Redux per recuperare il profilo utente corrente tramite API
 * Fa fetch con token, se ok dispatcha setProfile con i dati
 * Gestisce errori di rete o risposta non ok loggando in console
 */
export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Passa token per autenticazione
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setProfile(data)); // Salva profilo nello store Redux
      } else {
        console.error("Errore nel recupero del profilo:", response.status);
      }
    } catch (error) {
      console.error("Errore di rete nel recupero del profilo:", error);
    }
  };
};
