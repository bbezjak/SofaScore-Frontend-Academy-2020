import React, { Fragment } from "react";
import "./List.css";
import { Card } from "../Card/Card";
import { Redirect } from "react-router-dom";
import spalding from "./../spalding.png";
import { NbaPicture } from "./../NbaPicture/NbaPicture";

//https://www.balldontlie.io/api/v1/teams
//https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/chi.png

//https://github.com/react-icons/react-icons/issues/105
//https://stackoverflow.com/questions/16771225/css3-rotate-animation

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      favorite: undefined, //GSW, LAL
      redirectToTeam: undefined
    };
  }

  componentDidMount() {
    const url = "https://www.balldontlie.io/api/v1/teams";

    console.log("Fetch started");

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          //simulacija za čekanje
          setTimeout(() => this.setState({ teams: result.data }), 5000);
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <Fragment>
        <NbaPicture />
        {this.state.redirectToTeam !== undefined && (
          <Redirect
            to={{
              pathname: "/team",
              state: {
                team: this.state.redirectToTeam
                //Pokušaj da neš napravim bez Reduxa, ali sam se zaletio....
                /*updateParent: updatedTeam => {
                  const _teams = this.state.teams;
                  const index = _teams.findIndex(
                    team => team.id === updatedTeam.id
                  );
                  _teams[index].name = updatedTeam.name;
                  _teams[index].city = updatedTeam.city;
                  this.setState({ ...this.state, teams: _teams });
                }*/
              }
            }}
          />
        )}
        {this.state.teams.length === 0 ? (
          <img id="spalding" src={spalding}></img>
        ) : (
          <ul className="teamList">
            {this.state.teams.map((team, index) => (
              <Card
                key={index}
                team={team}
                isFavorite={this.state.favorite === team.abbreviation}
                redirect={() =>
                  this.setState({ ...this.state, redirectToTeam: team })
                }
                setFavorite={() =>
                  this.setState({ ...this.state, favorite: team.abbreviation })
                }
              ></Card>
            ))}
          </ul>
        )}
      </Fragment>
    );
  }
}

export default List;
