import React from "react";

import { ThemeContext, themeOptions } from "../ThemeProvider/ThemeProvider";

export function Select() {
  // get current theme from context via useContext hook
  const { themeSelected, setTheme } = React.useContext(ThemeContext);

  const handleChange = React.useCallback(
    (event) => {
      const newValue = event.currentTarget.value;

      setTheme(newValue);
    },
    [setTheme]
  );

  return (
    <select
      className={`${themeSelected} select`}
      value={themeSelected}
      onChange={handleChange}
    >
      {themeOptions.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
