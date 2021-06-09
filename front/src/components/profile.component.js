import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import POIPersonalList from "./PoiPersonalList.component";
import MapWithMarker from "./MapWithMarker.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      poiList: []
    };
  }

  

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    this.fetchData(currentUser.id);
  }

  async fetchData(id){
    return await fetch('http://localhost:8080/api/poi/getPersonalPoi/'+id)
      .then(response => response.json())
      .then(data => {
         this.setState({poiList: data})
       });}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>{/*
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        */}
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <p>Liste des POI créés :</p>
        <POIPersonalList poiList={this.state.poiList}/>
        <MapWithMarker markers = {this.state.poiList}/>
      </div>: null}
      </div>
    );
  }
}
