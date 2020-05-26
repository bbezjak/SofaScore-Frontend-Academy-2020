import React from "react";
import "./App.css";
import List from "./List/List";
import TeamDetails from "./TeamDetails/TeamDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact
              path="/team"
              render={props => <TeamDetails {...props} />}
            ></Route>
            <Route exact path="/">
              <List />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
