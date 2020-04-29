import { TOGGLE_REMEMBER_ME } from "./loginActions";

export function rememberMeReducer(state = false, action) {
  switch (action.type) {
    case TOGGLE_REMEMBER_ME:
      return !state;
    default:
      return state;
  }
}
