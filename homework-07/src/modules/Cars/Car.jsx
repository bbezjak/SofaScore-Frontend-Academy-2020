import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import "./car.css";
import { reserveCar, freeCar } from "../../redux/actions";

export const Car = React.forwardRef(({ car }, ref) => {
  const dispatch = useDispatch();
  //const { edit, setEdit } = useState(false);

  const reserve = useCallback(
    (car, user) => {
      dispatch(reserveCar(car, user));
    },
    [dispatch]
  );

  const free = useCallback(
    (car, user) => {
      dispatch(freeCar(car, user));
    },
    [dispatch]
  );

  return (
    <div ref={ref} className="car">
      <img src={car.image} alt="car"></img>
      <div>
        <span>Brand: </span>
        <span>{car.brand}</span>
      </div>
      <div>
        <span>Type: </span>
        <span>{car.type}</span>
      </div>
      <div>
        <span>Name: </span>
        <span>{car.name}</span>
      </div>
      <div>
        <span>Registration: </span>
        <span>{car.registration}</span>
      </div>
      <div>
        {car.available && car.reserver !== "user" && (
          <>
            <button
              className="reserve_free"
              onClick={() => reserve(car, "user")}
            >
              Rezerviraj
            </button>
            {/*<button className="edit" onClick={() => setEdit(!edit)}>
              Uredi
        </button>*/}
          </>
        )}
        {!car.available && car.reserver === "user" && (
          <>
            <button className="reserve_free" onClick={() => free(car, "user")}>
              Oslobodi
            </button>
            {/*<button className="edit" onClick={() => setEdit(!edit)}>
              Uredi
            </button>*/}
          </>
        )}
        {!car.available && car.reserver !== "user" && (
          <span>Already reserved</span>
        )}
      </div>
    </div>
  );
});
