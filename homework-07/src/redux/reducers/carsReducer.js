import { SET_CARS, RESERVE_CAR, FREE_CAR } from "../actions/carsActions";

function reserveOrFreeCar(state, action, available, user) {
  let cars = state;
  const index = cars
    .map(function (e) {
      return e.id;
    })
    .indexOf(action.car.id);
  cars[index].available = available;
  cars[index].reserver = user;
  return [...cars];
}

export function carsReducer(state = [], action) {
  switch (action.type) {
    case SET_CARS:
      if (state.length === 0) {
        //tu treba ić neš pametnije, ali valjda bude za igranje i ovaj "cache" bio ok
        return [...state, ...action.cars];
      }
      break;
    case RESERVE_CAR:
      return reserveOrFreeCar(state, action, false, "user");
    case FREE_CAR:
      return reserveOrFreeCar(state, action, true, null);
    default:
      return state;
  }
}
