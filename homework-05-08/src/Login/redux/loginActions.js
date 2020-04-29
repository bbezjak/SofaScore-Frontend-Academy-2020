export const TOGGLE_REMEMBER_ME = "TOGGLE_REMEMBER_ME";

export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export const setUserToken = (token) => ({ type: SET_TOKEN, token: token });
export const removeUserToken = () => ({ type: REMOVE_TOKEN });

export const toggleRememberMe = () => ({
  type: TOGGLE_REMEMBER_ME,
});
