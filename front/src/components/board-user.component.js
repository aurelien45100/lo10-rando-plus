import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          <button type="button">
                <Link to={"/create-poi"} className="nav-link">Créer un point d'intérêt</Link>
          </button>
          <button type="button">
                <Link to={"/circuit-infos"} className="nav-link">Circuit info</Link>
          </button>
        </div>
      </div>
    );
  }
}
