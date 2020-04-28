import { combineReducers } from "redux";

// TODO importaj reducere
import { rememberMeReducer, tokenReducer } from "./../Login/redux";

export const rootReducer = combineReducers({
  rememberMe: rememberMeReducer,
  token: tokenReducer,
});
