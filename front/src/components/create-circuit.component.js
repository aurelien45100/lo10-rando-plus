import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polyline, GoogleMapProps } from "react-google-maps";
import { compose, withProps } from "recompose";
import AuthService from "../services/auth.service";
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
  	import { Container } from './container.component'

const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDf-yIqxErTkbWzKhLox7nAANnrfDIY190",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.listOfCoord[0].lat, lng: props.listOfCoord[0].lng }}>
      {props.isMarkerShown && <Marker position={{ lat: 41.015137, lng: 28.979530 }} />}
      <Polyline
          path={props.listOfCoord}
          options={{
              fillColor: "#000",
              fillOpacity: 0.4,
              strokeColor: "#000",
              strokeOpacity: 1,
              strokeWeight: 1
          }} />
          {
            props.listOfCoord.map((e, i) => {
              console.log(props.google)
              return (
                <Marker
                options={{
                  iconSize: 10,
                }}
      position={{ lat: e.lat, lng: e.lng }}
      label={`POI ${i + 1}`}
      labelStyle={{color: 'blue'}}
      draggable={false}/>
              )
            })
          }
          
  </GoogleMap>
)

export default class CreateCircuit extends Component {
  
  
  state = {
    poiList: this.props.circuitList,
    circuitsName: null,
    listOfCoord: null
  }

  componentDidMount() {
    this._initData()
  } 
  
  _initData = async () => {
      await fetch('http://localhost:8080/api/circuits/name')
    .then(response => response.json())
    .then(data => {
      this.setState({
        circuitsName: data
      })
     });
     await fetch('http://localhost:8080/api/poi/coord')
    .then(response => response.json())
    .then(data => {
      let newList = data.map((e) => {
        return {lat: e.posX, lng: e.posY}
      })
      this.setState({
        listOfCoord: newList
      })
     });
  } 

  render() {
    console.log("this.state.poiList : ",this.state.poiList)
    const _updatePoiList = (data) => {
    this.setState({
      poiList: data
    })
  }
    console.log("circuitsName : ",this.state.circuitsName);

    const userId = AuthService.getCurrentUser().id;
    return (
      <div className="container">
        <header className="jumbotron">
            <h3>Création d'un circuit</h3>
        </header>
        <button type="button">
            <Link to={"/user"} className="nav-link">Retour</Link>
        </button>
        <form action='http://localhost:8080/api/circuits/add' method="post">
          <label htmlFor="name">Titre</label>
          <input type="text" id="name" name="name" required />
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="poiList" value={JSON.stringify(this.state.poiList)} />

          <DndProvider backend={HTML5Backend}>
					<Container updatePoiList={_updatePoiList} poiList={this.state.poiList}/>
				</DndProvider>

          <button type="submit">Valider</button>
        </form>

       { this.state.listOfCoord && <MyMapComponent listOfCoord={this.state.listOfCoord}/> }

      </div>
    );
  }
}