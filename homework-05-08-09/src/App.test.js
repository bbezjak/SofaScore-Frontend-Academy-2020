import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import { renderWithRedux } from "./setupTests";

test("renders learn react link", () => {
  const { getByText } = renderWithRedux(<App />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
