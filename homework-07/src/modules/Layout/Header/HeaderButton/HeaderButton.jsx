import React from "react";

import "./headerButton.css";

export function HeaderButton({ id = undefined, children, onClick }) {
  return (
    <button id={id} className="header_button" onClick={onClick}>
      {children}
    </button>
  );
}
