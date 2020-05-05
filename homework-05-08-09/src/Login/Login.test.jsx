import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
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
  
    const { getByText, getByPlaceholderText, getAllByText } = renderWithRedux(
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="*">
          <h1>404 - page not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>);

    const username = getByPlaceholderText(/Your Username/i);
    const password = getByPlaceholderText(/Your Password/i);
  
    fireEvent.change(username, { target: { value: 'testUser' } })
    fireEvent.change(password, { target: { value: 'testUser-password' } })
    fireEvent.click(getByText(/Login/i))

    await waitForElementToBeRemoved(() => getByText(/Login/i))

    expect(getAllByText(/username/i)).toHaveLength(0);
    expect(getAllByText(/password/i)).toHaveLength(0);
    
  })
});
