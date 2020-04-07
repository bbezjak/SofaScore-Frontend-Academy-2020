import React from "react";
import "./Login.css";
import Input from "./../Input/Input";

export function Login() {
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState(undefined);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(undefined);
  const [token, setToken] = React.useState(undefined);
  const [fetchError, setFetchError] = React.useState(undefined);

  const fetchData = () => {
    function reset() {
      setUsernameError(undefined);
      setPasswordError(undefined);
      setFetchError(undefined);
    }

    reset();

    function submitData() {
      const url = "https://private-leagues-api.herokuapp.com/api/login";

      debugger;
      if (username === "") {
        console.log("Please provide username");
        setUsernameError("Please provide username");
      }

      if (password === "") {
        console.log("Please provide password");
        setPasswordError("Please provide password");
      }

      if (username !== "" && password !== "") {
        fetch(url, {
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
            if (res.status === 200) {
              console.log("Status is ok");
              res.json().then((json) => {
                console.log(json);
                setToken(json.token);
              });
            } else if (res.status === 422) {
              console.error("Status is not ok");
              setFetchError(
                "Username or password is invalid, login unsuccessful"
              );
            } else {
              console.error("Status is not ok");
              const str = "Error " + res.status;
              console.log(str);
              setFetchError("Error " + res.status);
            }
          })
          .catch((err) => {
            console.error("Error je " + err);
            setFetchError("Error during data exchange with server");
          });
      }
    }

    submitData();
  };

  return (
    <div className="flex-container">
      <div id="login-modal" className="flex-container blue-item">
        <h1>Login</h1>
        <form onSubmit={fetchData}>
          <Input
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Username"
            errorMessage={usernameError}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            errorMessage={passwordError}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div
        id="error-div"
        className={fetchError === undefined ? "no-display" : ""}
      >
        <p>{fetchError}</p>
      </div>
    </div>
  );
}
