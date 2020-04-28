import {
  SET_TOKEN_REMEMBER_ME,
  REMOVE_TOKEN_REMEMBER_ME,
} from "./loginActions";

export function rememberMeReducer(state = null, action) {
  switch (action.type) {
    case SET_TOKEN_REMEMBER_ME:
      return action.token;
    case REMOVE_TOKEN_REMEMBER_ME:
      return null;
    default:
      return state;
  }
}
