import React from "react";
import { useSelector } from "react-redux";

import "./main.css";
import { Cars } from "../../Cars/Cars";
import { Modal } from "./../../Modal/Modal";

export function Main() {
  const { modal } = useSelector((state) => state);
  return (
    <main>
      <Cars />
      {modal && <Modal />}
    </main>
  );
}
