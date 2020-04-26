import React from "react";
import "./Login.css";
import Input from "./Input/Input";

import { fetchData } from "./../fetch/fetch";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [token, setToken] = React.useState(undefined);
  const [fetchError, setFetchError] = React.useState(false);

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
        debugger;
        if (res.status === 200) {
          console.log("Status is ok");
          res.json().then((json) => {
            console.log(json);
            setToken(json.token);
          });
        } else if (res.status === 422) {
          setFetchError("Username or password is invalid, login unsuccessful");
        } else {
          setFetchError("Error " + res.status);
        }
      })
      .catch((err) => {
        setFetchError("Error during data exchange with server " + err);
      });
  };

  return (
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
          <button type="submit">Login</button>
        </form>
      </div>
      <div id="error-div" className={!fetchError ? "no-display" : ""}>
        <p>{fetchError}</p>
      </div>
    </div>
  );
}
