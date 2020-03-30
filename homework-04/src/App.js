import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./List/List";
import TeamDetails from "./TeamDetails/TeamDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const redirect = () => {
  debugger;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route
              path="/team"
              render={props => <TeamDetails {...props} />}
            ></Route>
            <Route path="/">
              <List />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
