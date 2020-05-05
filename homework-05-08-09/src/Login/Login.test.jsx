import React from "react";
import { fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import { Login } from "./Login";

import { renderWithRedux } from "../setupTests";

describe("label tests", () => {
  it("renders proper text elements", () => {
    const { getAllByText, getByText } = renderWithRedux(<Login />);
    expect(getAllByText(/username/i)).toHaveLength(2);
    expect(getAllByText(/password/i)).toHaveLength(2);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it('calls', async () => {
  
    const { getByText, getByPlaceholderText, debug } = renderWithRedux(<Login />);

    const username = getByPlaceholderText(/Your Username/i);
    const password = getByPlaceholderText(/Your Password/i);
  
    fireEvent.change(username, { target: { value: 'testUsername' } })
    fireEvent.change(password, { target: { value: 'testPassword' } })
    fireEvent.click(getByText(/Login/i))

    debug()

    
  })
});
