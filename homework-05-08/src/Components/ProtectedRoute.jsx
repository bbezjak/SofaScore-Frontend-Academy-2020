import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, ...routeProps }) {
  // in real app isLoggedIn would come from provider or from the redux state

  // TODO dodaj redux store informaciju ako user treba ostati logan, neki remember me
  const { token, rememberMe } = useSelector((state) => state);

  // in real app redirect would be to the login page
  return rememberMe !== null || token !== null ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
