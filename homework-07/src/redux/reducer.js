import { combineReducers } from "redux";

import { carsReducer, filtersReducer, modalReducer } from "./reducers";

export const rootReducer = combineReducers({
  cars: carsReducer,
  filters: filtersReducer,
  modal: modalReducer,
});
