import React, { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import "./cars.css";

import { Car } from "./Car";

export function Cars() {
  const { cars, filters } = useSelector((state) => state);
  const carRef = useRef(null);

  const emptyCarElemNum = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (carRef.current !== null) {
      const carWidth = carRef.current.getBoundingClientRect().width;
      const inOneRow = Math.round(windowWidth / carWidth);
      const emptyElems = cars.length % inOneRow;
      console.log(emptyElems);
    }
  }, [cars]);

  useEffect(() => {
    window.addEventListener("resize", emptyCarElemNum);
    return () => {
      window.removeEventListener("resize", emptyCarElemNum);
    };
  });

  let renderedCars = cars;
  for (const fn of filters) {
    renderedCars = renderedCars.filter(fn);
  }

  return (
    <div className="cars">
      {renderedCars.map((car) => (
        <Car ref={carRef} key={car.id + "-" + car.registration} car={car} />
      ))}
    </div>
  );
}
