import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import { Login } from "./Login/Login";
import { Home } from "./Home/Home";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { User } from "./User/User";

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/user">
              <User />
            </ProtectedRoute>
            <Route path="*">
              <h1>404 - page not found</h1>
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
