import { SET_TOKEN, REMOVE_TOKEN, REMEMBER_USER } from "./userActions";

const initialState = { token: null };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case REMEMBER_USER:
      return { ...state, rememberMe: true };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_TOKEN:
      return { ...initialState };
    default:
      return state;
  }
}
