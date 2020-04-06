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
        <span className="error-mesagge">{props.errorMessage}</span>
      ) : (
        <span className="error-message no-display">
          "text to keep place in DOM"
        </span>
      )}
    </>
  );
}

export default React.memo(Input);
