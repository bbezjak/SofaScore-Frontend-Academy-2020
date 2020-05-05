import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, ...routeProps }) {
  const { user } = useSelector((state) => state);

  return user.token ? (
    <Route {...routeProps}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
