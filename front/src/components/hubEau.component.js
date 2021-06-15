import React, { Component } from "react";
import HubEauService from "../services/hubeau.service";



export default class HubEauComponent extends Component {

  constructor(props) {
      super(props);

      this.state = {
        tempReady: false,
        tempList : [],
      };
  }

  componentDidMount() {
  /*  HubEauService.getTemp(48.298800506022374, 4.076549553391784, 20)
    // .then(response => response.json())
    .then(data => {
        console.log(data);
        this.state.tempReady =  true;
        this.state.tempList= data.data;
      });*/
    this.getTemp('48.299839077133996', '4.076549553391784', 20);
  }


  async getTemp(lat, long, dist) {
      return await fetch('https://hubeau.eaufrance.fr/api/v1/temperature/chronique?latitude=' + lat + '&longitude=' + long + '&distance=' + dist)
          .then(response => response.json())
          .then(data => {
              this.setState({
                  tempReady: true,
                  tempList: data.data
              })
          });
  }


  render() {
    console.log("tempList : ", this.state.tempList);
    return (
      <div>
      <p>Liste des points d'eau : </p>
      <ul>
      { this.state.tempList.map((data,index) => {
          if (data && index==1) {
            return (
              <li> Point d'eau : {data.libelle_cours_eau} - Temperature : {data.code_unite} °C</li>
      	   )
      	 }
      	 return null
      }) }
      </ul>
  </div>
    );
  }

  }


// export default React.memo(HubEauComponent)
