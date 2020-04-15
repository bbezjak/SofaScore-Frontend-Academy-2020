import React from "react";
import "./App.css";
import { MyApp } from "./MyApp/MyApp";

function App() {
  return (
    <>
      <div id="portal-root" />
      <div className="App">
        <MyApp />
      </div>
    </>
  );
}

export default App;
