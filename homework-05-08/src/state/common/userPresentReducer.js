import { SET_USER_PRESENT, SET_USER_ABSENT } from "./commonActions";

export function userPresentReducer(state = false, action) {
  switch (action.type) {
    case SET_USER_PRESENT:
      return true;
    case SET_USER_ABSENT: //curently not used because this reducer is not persisted
      return false;
    default:
      return state;
  }
}
