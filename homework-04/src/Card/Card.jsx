import React, { Fragment } from "react";
import "./Card.css";

export class Card extends React.Component {
  render() {
    return (
      <li
        className={this.props.isFavorite ? "favorite" : ""}
        onClick={() => console.log(this.props.team.abbreviation + " clicked")}
      >
        <img
          src={`https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${this.props.team.abbreviation.toLowerCase()}.png`}
          alt=""
        />
        <p className="name">
          {this.props.team.city + "\n" + this.props.team.name}
        </p>
        <button id="edit" onClick={this.props.redirect}>
          Edit team
        </button>
        <button
          onClick={this.props.setFavorite}
          disabled={this.props.isFavorite}
        >
          Make team favorite
        </button>
      </li>
    );
  }
}
