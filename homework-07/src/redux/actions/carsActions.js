export const SET_CARS = "SET_CARS";
export const RESERVE_CAR = "RESERVE_CAR";
export const FREE_CAR = "FREE_CAR";

export const setCars = (cars) => ({ type: SET_CARS, cars });
export const reserveCar = (car, user) => ({
  type: RESERVE_CAR,
  car,
  user,
});
export const freeCar = (car, user) => ({
  type: FREE_CAR,
  car,
  user,
});
