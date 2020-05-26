import React from "react";

export const themeOptions = ["red-orange", "purple-gold"];

/**
 * Context is usually in separate file (e.g. ThemeProvider.jsx)
 */
export const ThemeContext = React.createContext();
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
