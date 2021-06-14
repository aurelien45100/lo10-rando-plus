import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const ListCircuits = (props) => {
  const [circuitList, setCircuitList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:8080/api/circuits/search')
      .then(response => response.json())
      .then(data => {
        console.log("[init][CreateCircuits]: ",data)
        setCircuitList(data) 
       });}  

  useEffect(() => {
    console.log("[OK] : useEffect / CreateCircuits")
    fetchData()
  },[]);
	

  return (
    <div className="container">
        <header className="jumbotron">
            <h3>List des circuits</h3>
        </header>
        <button type="button">
            <Link to={"/user"} className="nav-link">Retour</Link>
        </button>
        <div>
          <ul>
          {
            circuitList && circuitList.map(e => {
              return <li>{e.name}</li>
            })
          }
          </ul>
        </div>
      </div>
   );
}

export default ListCircuits