import React from "react";

import "./MyApp.css";

import { Select } from "../Select/Select";
import { Accordion } from "../Accordion/Accordion";
import {
  ThemeContext,
  ThemeProvider,
  themeOptions,
} from "../ThemeProvider/ThemeProvider";
import { Modal } from "../Modal/Modal";
import { useIsOpen } from "../shared/UseIsOpen";

export function MyApp() {
  // variable that controls theme selection
  const [theme, setTheme] = React.useState(themeOptions[0]);
  const { open, clickHandler } = useIsOpen();

  const themeContext = React.useContext(ThemeContext);

  console.log("Theme selected =", theme);

  return (
    <>
      <ThemeProvider value={{ themeSelected: theme, setTheme }}>
        <Select />
        <Accordion />
        <button onClick={clickHandler} className={themeContext}>
          {open ? "Close modal" : "Open modal"}
        </button>
        {open && (
          <Modal>
            <div id="modal_child">
              <h1>Modal children</h1>
              <button onClick={clickHandler}>Close</button>
            </div>
          </Modal>
        )}
      </ThemeProvider>
    </>
  );
}
