const token = import.meta.env.VITE_TOKEN;

export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});

export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setProfile(data));
      } else {
        console.error("Errore nel recupero del profilo:", response.status);
      }
    } catch (error) {
      console.error("Errore di rete nel recupero del profilo:", error);
    }
  };
};
