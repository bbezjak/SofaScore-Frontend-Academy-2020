import React from "react";
import { useSelector } from "react-redux";

import "./modal.css";

import { ModalItem } from "./ModalItem/ModalItem";

export function Modal() {
  const { cars } = useSelector((state) => state);
  const filteredCars = cars.filter(
    (car) => car.available === false && car.reserver === "user"
  );
  return (
    <div className="reserved_modal">
      {filteredCars.length === 0 ? (
        <span id="nothing_selected_span">Nothing is reserved</span>
      ) : (
        filteredCars.map((car) => <ModalItem key={car.id} car={car} />)
      )}
    </div>
  );
}
