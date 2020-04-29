import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { fetchData } from "../Components/fetch/fetch";
import { setUserPresent } from "../state/common";

export function ProtectedRoute({ children, ...routeProps }) {
  const { token, userPresent, rememberMe } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function isTokenValid() {
    const url = "https://private-leagues-api.herokuapp.com/api/check-token";
    const method = "post";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      token: token,
    };
    try {
      const res = await fetchData(url, method, headers, body);
      if (res.status === 204) {
        dispatch(setUserPresent());
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  function loogedIn() {
    //User opened browser and went to app
    if (token === null) {
      return false;
    }

    //User returned to app after visiting and is not remembered
    if (rememberMe === false && userPresent === false) {
      return false;
    }

    //All other cases --> check if token is valid
    const validToken = isTokenValid();

    return validToken;
  }

  return loogedIn() ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
