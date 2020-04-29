import { combineReducers } from "redux";

// TODO importaj reducere
import { rememberMeReducer, tokenReducer } from "./../Login/redux";

import { userPresentReducer } from "./common";

export const rootReducer = combineReducers({
  rememberMe: rememberMeReducer,
  token: tokenReducer,
  userPresent: userPresentReducer,
});
