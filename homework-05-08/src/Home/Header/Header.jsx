import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeUserToken } from "./../../Login/redux";
import { setUserAbsent } from "./../../state/common";

import "./header.css";

export function Header() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(removeUserToken());
    dispatch(setUserAbsent());
  }

  return (
    <div className="home-header">
      <div className="links-div">
        <Link exact to="/">
          Home
        </Link>
        <Link exact to="/user">
          User
        </Link>
      </div>
      <button className="logout_button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
