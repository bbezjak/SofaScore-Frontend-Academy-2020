import React, { Fragment } from "react";
import "./NbaPicture.css";
import { Redirect } from "react-router-dom";
import nba from "./../nba-logo-transparent.png";

export class NbaPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  render() {
    return (
      <Fragment>
        <img
          id="nba"
          src={nba}
          onClick={() => this.setState({ redirect: true })}
        ></img>
        {this.state.redirect && <Redirect to={{ pathname: "/" }} />}
      </Fragment>
    );
  }
}
