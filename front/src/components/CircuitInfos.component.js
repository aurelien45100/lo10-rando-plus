import React, { Component } from "react";
import MapWithMarker from "./MapWithMarker.component";

export default class CircuitInfos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            meteo : [],
            circuit: []
        };
    }

    componentDidMount() {
        // RECUPERATION PAS PROPRE DE L'ID DANS L'URI
        /*var id = window.location.pathname.split("/")[2];
        this.fetchData(id);*/
        this.getMeteo('48.299839077133996', '4.073149400678995');
    }

    // RECUPERATION DU CIRCUIT
    /*async fetchData(id) {
        return await fetch('http://localhost:8080/api/poi/getCircuit/' + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ready: true, circuit: data})
            });
    }*/

    async getMeteo(lat, long) {
        return await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&lang=fr&units=metric&appid=f09daabe5bd5bc40a63ad9250905554c')
            .then(response => response.json())
            .then(data => {
                this.setState({ready: true, meteo: data})
            });
    }
  
  render() {

    return (
        
        <div className="container">
            {(this.state.ready) ?
            <div>
                <header className="jumbotron">
                    <h3>(Nom du circuit)</h3>
                    <p>Créé par : (nom de l'utilisateur)</p>
                </header>
                <p>Distance : (distance) | Durée : (durée)</p>
                <p>Météo : {this.state.meteo.weather.description}</p>
                <ul>
                    <li>Temperature : {this.state.meteo.main.temp} °C</li>
                    <li>Humidité : {this.state.meteo.main.humidity} %</li>
                </ul>
                <MapWithMarker markers = {this.state.circuit}/>
            </div> : null}
        </div>
    );
  }
}