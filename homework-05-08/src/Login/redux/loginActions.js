export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export const SET_TOKEN_REMEMBER_ME = "SET_TOKEN_REMEMBER_ME";
export const REMOVE_TOKEN_REMEMBER_ME = "REMOVE_TOKEN_REMEMBER_ME";

export const setUserToken = (token) => ({ type: SET_TOKEN, token: token });
export const removeUserToken = () => ({ type: REMOVE_TOKEN });

export const setUserTokenRememberMe = (token) => ({
  type: SET_TOKEN_REMEMBER_ME,
  token: token,
});
export const removeUserTokenRememberMe = () => ({
  type: REMOVE_TOKEN_REMEMBER_ME,
});
