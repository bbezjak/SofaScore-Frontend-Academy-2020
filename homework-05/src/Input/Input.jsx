import React from "react";
import "./Input.css";

export function Input(props) {
  return (
    <>
      <label>{props.label}</label>
      <input
        className="login-element"
        type={props.type}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
      ></input>
      {props.errorMessage !== undefined ? (
        <p className="error-mesagge">{props.errorMessage}</p>
      ) : (
        <p> </p>
      )}
    </>
  );
}

export default React.memo(Input);
