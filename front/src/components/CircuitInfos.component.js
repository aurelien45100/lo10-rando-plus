import React, { Component } from "react";
import MapWithMarker from "./MapWithMarker.component";
import CommentList from "./CommentList.component";
import AuthService from "../services/auth.service";

export default class CircuitInfos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            circuitReady: false,
            meteoReady: false,
            commentsReady: false,
            meteo : [],
            circuit: [],
            comments: [],
            circuitId: 1
        };
    }

    componentDidMount() {
        // RECUPERATION PAS PROPRE DE L'ID DANS L'URI
        this.state.circuitId = window.location.pathname.split("/")[2];
        this.getCircuit(this.state.circuitId);

        // TODO Remplacer les coordonnées par le 1er point du circuit
        this.getMeteo('48.299839077133996', '4.073149400678995');

        this.getComment(this.state.circuitId);
    }

    // RECUPERATION DU CIRCUIT
    async getCircuit(circuitId) {
        return await fetch('http://localhost:8080/api/circuits/getCircuitById/' + circuitId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    circuitReady: true,
                    circuit: data
                })
                console.log('test: ' + data[0].name);
            });
    }

    async getMeteo(lat, long) {
        return await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&lang=fr&units=metric&appid=f09daabe5bd5bc40a63ad9250905554c')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    meteoReady: true,
                    meteo: data
                })
            });
    }

    async getComment(circuitId) {
        return await fetch('http://localhost:8080/api/comment/get/' + circuitId)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    commentsReady: true,
                    comments: data
                })
            });
    }

  render() {
    const userId = AuthService.getCurrentUser().id;
    console.log("this.state.meteo : ",this.state.meteo)
    return (
        <div className="container">
            {(this.state.circuitReady) ?
            <div>
                <header className="jumbotron">
                    <h3>{this.state.circuit[0].name}</h3>
                    <p>Créé par : {this.state.circuit[0].userId} (nom de l'utilisateur)</p>
                </header>
                <p>Distance : (distance) | Durée : (durée)</p>
                {(this.state.meteoReady) ?
                    <div>
                    <p>Météo : {this.state.meteo.weather[0].description}</p>
                    <ul>
                        <li>Temperature : {this.state.meteo.main.temp} °C</li>
                        <li>Humidité : {this.state.meteo.main.humidity} %</li>
                    </ul>
                </div> : null
                }
                <HubEauComponent/>
                <MapWithMarker markers = {this.state.circuit}/>
                {(this.state.commentsReady) ?
                    <div>
                        <div>
                            <h3>Commentaires</h3>
                            <CommentList commentList={this.state.comments} />
                        </div>
                        <form action='http://localhost:8080/api/comment/add' method="post">
                            <h3>Nouveau commentaire :</h3>
                            <input type="hidden" name="userId" value={userId} />
                            <input type="hidden" name="circuitId" value={this.state.circuitId} />
                            <label for="note">Indiquez votre note</label>
                            <select id="note" name="note">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <label for="content">Votre commentaire</label>
                            <textarea id="content" name="content" rows="5" cols="50" placeholder="Ecrivez votre commentaire"></textarea>
                            <button type="submit">Valider</button>
                        </form>
                    </div> : null
                }
            </div> : null}
        </div>
    );
  }
}
