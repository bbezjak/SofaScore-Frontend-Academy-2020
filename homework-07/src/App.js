import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import { Header } from "./modules/Layout/Header/Header.jsx";
import { Main } from "./modules/Layout/Main/Main.jsx";
import { setCars } from "./redux/actions/carsActions";

import { cars } from "./data/cars";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCars(cars));
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App-header">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
