import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./Login.css";

import Input from "./Input/Input";

import { fetchData } from "../Components/fetch/fetch";
import {
  removeUserToken,
  removeUserTokenRememberMe,
  setUserToken,
  setUserTokenRememberMe,
} from "./redux";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [fetchError, setFetchError] = React.useState(false);

  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  //initialization
  useEffect(() => {
    dispatch(removeUserToken());
    dispatch(removeUserTokenRememberMe());
  }, [dispatch]);

  function isFormValid() {
    setUsernameError(false);
    setPasswordError(false);
    setFetchError(false);

    let isFormValid = true;

    if (username === "") {
      setUsernameError(true);
      isFormValid = false;
    }

    if (password === "") {
      setPasswordError(true);
      isFormValid = false;
    }

    return isFormValid;
  }

  const fetchUser = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const url = "https://private-leagues-api.herokuapp.com/api/login";
    const method = "post";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = {
      username: username,
      password: password,
    };

    /*fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        debugger;
        if (res.status === 200) {
          console.log("Status is ok");
          res.json().then((json) => {
            console.log(json);
            setToken(json.token);
          });
        } else if (res.status === 422) {
          console.error("Status is not ok");
          setFetchError("Username or password is invalid, login unsuccessful");
        } else {
          console.error("Status is not ok");
          const str = "Error " + res.status;
          console.log(str);
          setFetchError("Error " + res.status);
        }
      })
      .catch((err) => {
        debugger;
        console.error("Error je " + err);
        setFetchError("Error during data exchange with server");
      });*/

    await fetchData(url, method, headers, body)
      .then((res) => {
        if (res.status === 200) {
          console.log("Status is ok");
          res.json().then((json) => {
            debugger;
            console.log(json);
            dispatch(setUserToken(json.token));
            if (rememberMe) {
              dispatch(setUserTokenRememberMe(json.token));
            }
            setRedirect(true);
          });
        } else if (res.status === 422) {
          setFetchError("Username or password is invalid, login unsuccessful");
        } else {
          setFetchError("Status " + res.status);
        }
      })
      .catch((err) => {
        setFetchError("Error during data exchange with server " + err);
      });
  };

  function handleChecked() {
    setRememberMe(!rememberMe);
  }

  return (
    <>
      {redirect && <Redirect to="/" />}
      <div className="flex-container">
        <div id="login-modal" className="flex-container blue-item">
          <h1>Login</h1>
          <form onSubmit={fetchUser}>
            <Input
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
              displayError={usernameError}
              errorMessage="Please provide username"
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              displayError={passwordError}
              errorMessage="Please provide password"
            />
            <div className="flex-container">
              <button type="submit">Login</button>
              <div>
                <input
                  type="checkbox"
                  //checked={this.state.active}
                  onClick={handleChecked}
                />
                <label>Remember me</label>
              </div>
            </div>
          </form>
        </div>
        <div id="error-div" className={!fetchError ? "no-display" : ""}>
          <p>{fetchError}</p>
        </div>
      </div>
    </>
  );
}
