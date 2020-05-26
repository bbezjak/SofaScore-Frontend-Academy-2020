import React from "react";

import "./modalItem.css";

export function ModalItem({ car }) {
  return (
    <div className="modal_item">
      <img className="modal_image" src={car.image} alt="car modal item"></img>
      <span>{car.name}</span>
    </div>
  );
}
