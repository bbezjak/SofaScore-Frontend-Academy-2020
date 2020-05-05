import React from "react";
import "./Input.css";

export function Input(props) {
  const error = props.displayError ? "" : "no-display";

  return (
    <>
      <label className="input-label">{props.label}</label>
      <input
        className="login-element"
        type={props.type}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
      ></input>
      <span className={`error-mesagge ${error}`}>{props.errorMessage}</span>
    </>
  );
}
export default React.memo(Input);
