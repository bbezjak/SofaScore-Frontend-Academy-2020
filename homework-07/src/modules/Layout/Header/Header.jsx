import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";

import { HeaderButton } from "./HeaderButton/HeaderButton.jsx";
import {
  showAllCars,
  showAvailableCars,
} from "./../../../redux/actions/filterActions";
import { toggleModal } from "./../../../redux/actions/modalActions";

export function Header({ children }) {
  const dispatch = useDispatch();

  const showAll = useCallback(() => {
    dispatch(showAllCars());
  }, [dispatch]);

  const showAvailable = useCallback(() => {
    dispatch(showAvailableCars());
  }, [dispatch]);

  const modalToggler = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  const { modal } = useSelector((state) => state);

  return (
    <header>
      <div>
        <HeaderButton onClick={showAll}>
          <span>Pokaži sve</span>
        </HeaderButton>
        <HeaderButton onClick={showAvailable}>
          <span>Pokaži dostupne</span>
        </HeaderButton>
      </div>
      <div>
        <HeaderButton id="modal_toggler" onClick={modalToggler}>
          <span>{modal ? "Sakrij rezervirane" : "Pokaži rezervirane"}</span>
        </HeaderButton>
      </div>
    </header>
  );
}
