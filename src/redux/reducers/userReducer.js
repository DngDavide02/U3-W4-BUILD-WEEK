// Stato iniziale del slice "user"
const initialState = {
  profile: null, // Profilo utente inizialmente vuoto
};

// Reducer per gestire lo stato "user"
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      // Quando arriva l'azione "SET_PROFILE", aggiorna il profilo utente
      return {
        ...state, // Mantieni lo stato precedente
        profile: action.payload, // Imposta il profilo con i dati ricevuti
      };
    default:
      // Per azioni non gestite, ritorna lo stato corrente invariato
      return state;
  }
};

export default userReducer;
