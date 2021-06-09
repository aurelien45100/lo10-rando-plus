import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
import AuthService from "../services/auth.service";

var posX = 48.299839077133996;
var posY = 4.073149400678995;

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px`, width:`1000px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 48.299839077133996, lng: 4.073149400678995 }}
  >
    {<Marker
      position={{ lat: 48.299839077133996, lng: 4.073149400678995 }}
      draggable={true}
      onDragEnd={(e) => {
        const {latLng} = e;
        posX = latLng.lat();
        document.getElementById('posX').value = posX;
        posY = latLng.lng();
        document.getElementById('posY').value = posY;
      }} />
    }
  </GoogleMap>
)

export default class CreatePOI extends Component {

  async fetchData (params) {
    return await fetch('http://localhost:8080/api/poi/add', params);
  }
  
  render() {
    const userId = AuthService.getCurrentUser().id;
    return (
      <div className="container">
        <header className="jumbotron">
            <h3>Création d'un point d'intérêt</h3>
        </header>
        <button type="button">
            <Link to={"/user"} className="nav-link">Retour</Link>
        </button>

        <form action='http://localhost:8080/api/poi/add' method="post">
          <label for="name">Titre</label>
          <input type="text" id="name" name="name" required />
          <input type="hidden" name="userId" value={userId} />
          <label for="posX">Latitude</label>
          <input type="text" id="posX" name="posX" value={posX} />
          <label for="posY">Longitude</label>
          <input type="text" id="posY" name="posY" value={posY} />
          <button type="submit">Valider</button>
        </form>

        <MyMapComponent />

      </div>
    );
  }
}