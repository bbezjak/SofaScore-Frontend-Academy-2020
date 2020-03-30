import React, { Fragment } from "react";
import "./TeamDetails.css";
import { NbaPicture } from "./../NbaPicture/NbaPicture";

class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.location.state.team
    };
  }

  handleChangeCity = event => {
    debugger;
    const _team = this.state.team;
    _team.city = event.target.value;
    this.setState({ team: _team });
  };

  handleChangeName = event => {
    debugger;
    const _team = this.state.team;
    _team.name = event.target.value;
    this.setState({ team: _team });
  };

  handleSubmit = () => {
    debugger;
    this.props.location.state.updateParent(this.state.team);
  };

  render() {
    return (
      <Fragment>
        <NbaPicture />
        <label>Team City</label>
        <input
          type="text"
          value={this.state.team.city}
          onChange={this.handleChangeCity}
        ></input>
        <label>Team Name</label>
        <input
          type="text"
          value={this.state.team.name}
          onChange={this.handleChangeName}
        ></input>
        <button>Save</button>
      </Fragment>
    );
  }
}

export default TeamDetails;
