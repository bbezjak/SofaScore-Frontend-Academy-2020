import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeUserToken } from "../../state/user";

import "./header.css";

export function Header() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(removeUserToken());
  }

  return (
    <div className="home-header">
      <div className="links-div">
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
      </div>
      <button className="logout_button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
