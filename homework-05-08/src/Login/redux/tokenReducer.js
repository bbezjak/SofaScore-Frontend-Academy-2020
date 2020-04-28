import { SET_TOKEN, REMOVE_TOKEN } from "./loginActions";

export function tokenReducer(state = null, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    case REMOVE_TOKEN:
      return null;
    default:
      return state;
  }
}
