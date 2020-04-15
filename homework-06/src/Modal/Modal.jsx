import React from "react";
import ReactDOM from "react-dom";

import { ThemeContext } from "../ThemeProvider/ThemeProvider";

import "./Modal.css";

/**
 * Note how Modal will be rendered outside hierarchy in the DOM, but will be kept in hierarchy in Virtual DOM
 */
export function Modal({ children }) {
  const { themeSelected } = React.useContext(ThemeContext);

  const markup = (
    <div id="modal_wrapper" className={`${themeSelected} modal`}>
      {children}
    </div>
  );

  const portalRoot = document.getElementById("portal-root");

  return ReactDOM.createPortal(markup, portalRoot);
}
