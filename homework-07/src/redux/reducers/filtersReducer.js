import { SHOW_ALL, SHOW_AVAILABLE } from "../actions/filterActions";

const filter = (car) => car.available === true;

// Ovo se garant može bolje napisat...
function checkEqualsToString(arg1, arg2) {
  const eq = arg1.toString() === arg2.toString();
  return eq;
}

export function filtersReducer(state = [], action) {
  if (action.type === SHOW_ALL) {
    return [];
  } else if (action.type === SHOW_AVAILABLE) {
    for (const fun of state) {
      if (checkEqualsToString(fun, filter)) {
        return state;
      }
    }
    return [...state, filter];
  }

  return state;
}
