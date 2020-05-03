export const REMEMBER_USER = "REMEMBER_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export const rememberUser = () => ({
  type: REMEMBER_USER,
});
export const setUserToken = (token) => ({ type: SET_TOKEN, token: token });
export const removeUserToken = () => ({ type: REMOVE_TOKEN });
